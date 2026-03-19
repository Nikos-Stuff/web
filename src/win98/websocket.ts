
  import SamJs from "sam-js";
  let sam = new SamJs();

  // --- Freak u typescript ---
  declare var turnstile: {
    reset: () => void;
  };

  interface Stroke {
    x: number;
    y: number;
    lastX: number;
    lastY: number;
    color: string;
    size: number;
    mode: string;
  }

  // --- Configuration & State ---
  const WS_URL = "wss://ws_wall.nikostuff.com";
  let ws: WebSocket | null = null;
  let myClientId: string | null = null;
  let reconnectAttempts = 0;
  let lastMoveSent = 0;
  let isDrawing = false;
  let lastX = 0,
    lastY = 0;
  const remoteCursors = new Map<string, HTMLDivElement>();
  const userColors: Record<string, string> = {};
  let strokeBuffer: Stroke[] = [];
  const FLUSH_INTERVAL = 32;
  const cursorLastSeen = new Map<string, number>();
  const CURSOR_TIMEOUT = 5000;

  let lastMsgsIn = 0;
  let lastMsgsOut = 0;
  let lastBytesIn = 0;
  let lastBytesOut = 0;

  const stats = {
    msgsIn: 0,
    msgsOut: 0,
    bytesIn: 0,
    bytesOut: 0,
    startTime: Date.now(),
  };

  // --- DOM Elements ---
  const canvas = document.getElementById("paintCanvas") as HTMLCanvasElement;
  const ctx = canvas.getContext("2d", {
    desynchronized: true,
  }) as CanvasRenderingContext2D;
  const canvasStage = document.getElementById("canvasStage") as HTMLDivElement;
  const chatLog = document.querySelector(".chat-log") as HTMLUListElement;
  const msgInput = document.getElementById("message") as HTMLInputElement;
  const nickInput = document.getElementById("nickname") as HTMLInputElement;
  const coordsLabel = document.getElementById("coords") as HTMLElement;
  const colorInput = document.getElementById("colorInput") as HTMLInputElement;
  const brushSize = document.getElementById("brushSize") as HTMLInputElement;
  const notify_sound = document.getElementById("notify") as HTMLAudioElement;

  const staticCanvas = document.getElementById(
    "staticCanvas",
  ) as HTMLImageElement;

  const canvasLoader = document.getElementById(
    "canvasLoader",
  ) as HTMLImageElement;

  // --- Helpers ---
  function getReadableRandomColor() {
    return `hsl(${Math.floor(Math.random() * 360)}, 70%, 40%)`;
  }

  function flushStrokeBuffer() {
    if (strokeBuffer.length > 0 && ws?.readyState === 1) {
      ws.send(
        JSON.stringify({
          event: "user.draw.batch",
          data: strokeBuffer,
        }),
      );
      strokeBuffer = [];
    }
  }

  function text_to_speech(message: string) {
    const buf32 = sam.buf32(message);

    if (!buf32 || !(buf32 instanceof Float32Array)) {
      console.error("Failed to generate audio buffer:", message);
      return;
    }

    for (let i = 0; i < buf32.length; i++) buf32[i] *= 0.2;

    const audioCtx = new (
      window.AudioContext || (window as any).webkitAudioContext
    )();
    const audioBuffer = audioCtx.createBuffer(1, buf32.length, 22050);
    audioBuffer.getChannelData(0).set(buf32);

    const source = audioCtx.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(audioCtx.destination);
    source.start();
  }

  // heartbeat to clear stuff out
  setInterval(flushStrokeBuffer, FLUSH_INTERVAL);

  function updateStatsUI() {
    const msgsInDelta = stats.msgsIn - lastMsgsIn;
    const msgsOutDelta = stats.msgsOut - lastMsgsOut;
    const bytesInDelta = stats.bytesIn - lastBytesIn;
    const bytesOutDelta = stats.bytesOut - lastBytesOut;

    lastMsgsIn = stats.msgsIn;
    lastMsgsOut = stats.msgsOut;
    lastBytesIn = stats.bytesIn;
    lastBytesOut = stats.bytesOut;

    const rateEl = document.getElementById("stat-rate");
    const inEl = document.getElementById("stat-in");
    const outEl = document.getElementById("stat-out");

    if (rateEl) rateEl.innerText = `${msgsInDelta + msgsOutDelta}/s`; // messages per second
    if (inEl) inEl.innerText = `${(bytesInDelta / 1024).toFixed(2)} KB/s`;
    if (outEl) outEl.innerText = `${(bytesOutDelta / 1024).toFixed(2)} KB/s`;

    const clockEl = document.getElementById("tray-clock");
    if (clockEl) {
      const now = new Date();
      clockEl.innerText = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    }
  }

  setInterval(updateStatsUI, 1000);

  function cleanupStaleCursors() {
    const now = Date.now();

    for (const [clientId, lastSeen] of cursorLastSeen.entries()) {
      if (now - lastSeen > CURSOR_TIMEOUT) {
        const el = remoteCursors.get(clientId);
        if (el) {
          el.remove();
          remoteCursors.delete(clientId);
        }
        cursorLastSeen.delete(clientId);
      }
    }
  }
  setInterval(cleanupStaleCursors, 2000);

  function refreshCanvas(): void {
    if (!staticCanvas || !canvasLoader || !ctx) return;

    canvasLoader.style.display = "block";

    staticCanvas.addEventListener(
      "load",
      () => {
        setTimeout(() => {
          setTimeout(() => {
            canvasLoader.style.display = "none";
          }, 5000);
        }, 200);
      },
      { once: true },
    );

    staticCanvas.src = `https://api.nikostuff.com/StaticCanvas?ts=${Date.now()}`;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  setInterval(() => {
    staticCanvas.src = `https://api.nikostuff.com/StaticCanvas?ts=${Date.now()}`;
  }, 1000);

  function log_message(from: string, text: string) {
    if (!chatLog) return;
    const li = document.createElement("li");
    if (!userColors[from]) userColors[from] = getReadableRandomColor();
    li.innerHTML = `<strong style="color: ${userColors[from]}">${from}: </strong> ${text}`;
    chatLog.appendChild(li);
    chatLog.scrollTop = chatLog.scrollHeight;

    // play da sound
    notify_sound.volume = 0.03;
    notify_sound.play();
  }

  const originalSend = WebSocket.prototype.send;
  WebSocket.prototype.send = function (data: any) {
    stats.msgsOut++;

    // calc the size safely - checking which property exists
    if (typeof data === "string") {
      stats.bytesOut += data.length;
    } else if (data instanceof ArrayBuffer) {
      stats.bytesOut += data.byteLength;
    } else if (data instanceof Blob) {
      stats.bytesOut += data.size;
    } else if (ArrayBuffer.isView(data)) {
      stats.bytesOut += data.byteLength;
    }

    return originalSend.apply(this, [data] as any);
  };

  // --- Logic: Drawing & Cursors ---
  function renderStroke(stroke: any) {
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = stroke.mode === "erase" ? "#ffffff" : stroke.color;
    ctx.lineWidth = stroke.size;
    ctx.beginPath();
    ctx.moveTo(stroke.lastX, stroke.lastY);
    ctx.lineTo(stroke.x, stroke.y);
    ctx.stroke();
  }

  function handleRemoteMove(data: any) {
    if (data.clientId === myClientId) return;

    cursorLastSeen.set(data.clientId, Date.now());

    let cursor = remoteCursors.get(data.clientId);

    if (!cursor) {
      cursor = document.createElement("div");
      cursor.style.cssText = `
          position: absolute;
          top: 0;
          left: 0;
          pointer-events: none;
          z-index: 1000;
          will-change: transform;
        `;

      cursor.innerHTML = `
          <div style="width: 8px; height: 8px; background: red; border: 1px solid #000; box-shadow: 1px 1px 0px #fff inset; position: relative;"></div>
          <div class="cursor-label" style="
            position: absolute;
            left: 12px;
            top: 12px;
            padding: 1px 4px 2px 4px;
            background: #ffffca;
            border: 1px solid #000;
            font-family: 'MS Sans Serif', 'Tahoma', Arial, sans-serif;
            font-size: 11px;
            line-height: 12px;
            white-space: nowrap;
            box-shadow: 2px 2px 0px rgba(0,0,0,0.2);
          "></div>
        `;

      canvasStage.appendChild(cursor);
      remoteCursors.set(data.clientId, cursor);
    }

    const label = cursor.querySelector(".cursor-label") as HTMLElement;

    const currentName = data.username || "Guest";
    if (label.innerText !== currentName) {
      label.innerText = currentName;
    }

    const stageRect = canvasStage.getBoundingClientRect();
    const labelWidth = label.offsetWidth || 80;
    const labelHeight = label.offsetHeight || 18;
    const buffer = 4;

    let x = Math.max(buffer, Math.min(data.x, stageRect.width - 8 - buffer));
    let y = Math.max(buffer, Math.min(data.y, stageRect.height - 8 - buffer));

    const flipX = x + labelWidth + 25 > stageRect.width;
    const flipY = y + labelHeight + 25 > stageRect.height;

    label.style.left = flipX ? `-${labelWidth + 2}px` : "12px";
    label.style.top = flipY ? `-${labelHeight + 2}px` : "12px";

    if (flipX && x - labelWidth < buffer) x = labelWidth + buffer;
    if (flipY && y - labelHeight < buffer) y = labelHeight + buffer;

    x = Math.max(0, Math.min(x, stageRect.width - 2));
    y = Math.max(0, Math.min(y, stageRect.height - 2));

    cursor.style.transform = `translate(${x}px, ${y}px)`;
  }

  // --- Connection Management ---
  function connect() {
    if (ws && (ws.readyState === 0 || ws.readyState === 1)) return;
    ws = new WebSocket(WS_URL);

    ws.onopen = () => {
      reconnectAttempts = 0;
      log_message("System", "Connected to the websocket.");
    };

    ws.onmessage = (e) => {
      stats.msgsIn++;
      stats.bytesIn += new Blob([e.data]).size;
      const msg = JSON.parse(e.data);
      switch (msg.event) {
        case "welcome":
          myClientId = msg.data.clientId;
          break;
        case "chat.message":
          log_message(msg.data.from, msg.data.message);
          // play da speech
          const fullMessage = msg.data.from + " said: " + msg.data.message;
          text_to_speech(fullMessage);
          break;
        case "chat.history":
          msg.data.forEach((m: any) => log_message(m.from, m.message));
          break;
        case "paint.history":
          msg.data.strokes.forEach((s: any) => renderStroke(s));
          break;
        case "user.draw.batch":
          const strokes = msg.data.strokes;
          const delayBetweenPoints = 5;

          strokes.forEach((stroke: Stroke, index: number) => {
            // Use the Stroke interface here
            setTimeout(() => {
              renderStroke(stroke);

              handleRemoteMove({
                clientId: msg.data.clientId,
                username: msg.data.username,
                x: stroke.x,
                y: stroke.y,
              });
            }, index * delayBetweenPoints);
          });
          break;
        case "user.move":
          handleRemoteMove(msg.data);
          break;
        case "user.disconnected":
          // Delete Cursors
          const el = remoteCursors.get(msg.data.clientId);
          if (el) {
            el.remove();
            remoteCursors.delete(msg.data.clientId);
          }

          // Remove from Active Users table
          const row = Array.from(
            document.querySelectorAll<HTMLTableRowElement>(
              "#ActiveUsersTable tbody tr",
            ),
          ).find((tr) => tr.dataset.clientId === msg.data.clientId);
          if (row) row.remove();
          break;
        case "canvas.conversion":
          log_message(
            "System",
            "Saving canvas! Refreshing static snapshot. ( If you dont see it - clear your cache! )",
          );
          refreshCanvas();
          break;
        case "users.list":
          console.log(msg.data);
          const tableBody = document.querySelector<HTMLTableSectionElement>(
            "#ActiveUsersTable tbody",
          );
          if (!tableBody) {
            console.log("COULD NOT FIND TBODY! Check your HTML tags.");
            break;
          }

          // Clear previous rows
          tableBody.innerHTML = "";

          msg.data.users.forEach((user: any) => {
            const row = document.createElement("tr");
            row.dataset.clientId = user.clientId;
            const nameCell = document.createElement("td");
            const statusCell = document.createElement("td");

            nameCell.innerText = user.username;
            statusCell.innerText = "Online";

            row.appendChild(nameCell);
            row.appendChild(statusCell);
            tableBody.appendChild(row);
          });

          // Update active connections count
          const activeConnectionsEl =
            document.getElementById("activeConnections");
          if (activeConnectionsEl) {
            activeConnectionsEl.innerText = msg.data.users.length.toString();
          }
          break;
        case "user.typing":
          const userRow = document.querySelector<HTMLTableRowElement>(
            `#ActiveUsersTable tbody tr[data-client-id="${msg.data.clientId}"]`,
          );

          if (userRow) {
            userRow.cells[1].innerText = msg.data.typing
              ? "Typing..."
              : "Online";
          }
          break;
        case "error":
          log_message(
            "System",
            `<span style="color: red; font-weight: bold; font-size: 1.2em;">${msg.data.message}</span>`,
          );
          break;
      }
    };

    ws.onclose = () => {
      const delay = Math.min(5000 * Math.pow(2, reconnectAttempts), 30000);

      log_message(
        "System",
        `Connection lost! Retrying in ${delay / 1000} seconds...`,
      );

      setTimeout(() => {
        reconnectAttempts++;
        connect();
      }, delay);
    };
  }

  // --- Input Events ---
  canvas.addEventListener("pointerdown", (e) => {
    isDrawing = true;
    const rect = canvas.getBoundingClientRect();
    lastX = (e.clientX - rect.left) * (canvas.width / rect.width);
    lastY = (e.clientY - rect.top) * (canvas.height / rect.height);
  });

  window.addEventListener("pointerup", () => (isDrawing = false));

  canvas.addEventListener("pointermove", (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (canvas.width / rect.width);
    const y = (e.clientY - rect.top) * (canvas.height / rect.height);
    coordsLabel.innerText = `${Math.floor(x)}, ${Math.floor(y)}`;

    if (Date.now() - lastMoveSent > 150 && ws?.readyState === 1) {
      ws.send(
        JSON.stringify({
          event: "user.move",
          data: { x, y, username: nickInput.value },
        }),
      );
      lastMoveSent = Date.now();
    }

    if (!isDrawing) return;
    const stroke = {
      x,
      y,
      lastX,
      lastY,
      color: colorInput.value,
      size: parseInt(brushSize.value),
      mode: "draw",
    };
    renderStroke(stroke);
    strokeBuffer.push(stroke);

    lastX = x;
    lastY = y;
  });

  document.getElementById("sendBtn")?.addEventListener("click", () => {
    if (!nickInput || !msgInput || !ws) return;

    const nick = nickInput.value.trim();
    const msg = msgInput.value.trim();

    // cf grabber
    const turnstileRes = (
      document.querySelector(
        '[name="cf-turnstile-response"]',
      ) as HTMLInputElement | null
    )?.value;

    // check da boi
    if (!nick || !msg) {
      log_message("System", "Username / Message cannot be empty!");
      return;
    }

    if (!turnstileRes) {
      log_message("System", "Finish the verification!");
      return;
    }

    // sync
    ws.send(
      JSON.stringify({
        event: "chat.setUsername",
        data: { username: nick },
      }),
    );

    // yeet it!
    ws.send(
      JSON.stringify({
        event: "chat.message",
        data: {
          from: nick,
          message: msg,
          "cf-turnstile": turnstileRes,
        },
      }),
    );

    // clean it!
    msgInput.value = "";

    // reset!
    if (typeof turnstile !== "undefined") {
      turnstile.reset();
    }
  });

  // typing
  let typingTimeout: ReturnType<typeof setTimeout> | null = null;
  let isCurrentlyTyping = false;

  msgInput.addEventListener("input", () => {
    if (!ws || ws.readyState !== 1) return;

    if (!isCurrentlyTyping && msgInput.value.length > 0) {
      isCurrentlyTyping = true;
      ws.send(
        JSON.stringify({
          event: "user.typing",
          data: { typing: true },
        }),
      );
    }

    if (typingTimeout) clearTimeout(typingTimeout);

    typingTimeout = setTimeout(() => {
      isCurrentlyTyping = false;
      if (ws?.readyState === 1) {
        ws.send(
          JSON.stringify({
            event: "user.typing",
            data: { typing: false },
          }),
        );
      }
    }, 2000);
  });

  // --- UI Feedback ---
  function updateBrushPreview(): void {
    const size = brushSize.value;
    const color = colorInput.value;

    // Update the text display (Brush: Xpx)
    const brushDisplay = document.getElementById("brushDisplay");
    if (brushDisplay) brushDisplay.innerText = size;

    // Update the visual circle
    const sizePreview = document.getElementById("sizePreview");
    if (sizePreview) {
      sizePreview.style.width = `${size}px`;
      sizePreview.style.height = `${size}px`;
      sizePreview.style.backgroundColor = color;
    }
  }

  // Listen for changes
  brushSize.addEventListener("input", updateBrushPreview);
  colorInput.addEventListener("input", updateBrushPreview);

  // Run once on load to sync initial values
  updateBrushPreview();

  connect();
