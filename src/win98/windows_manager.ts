import gsap from "gsap";

// --- AUDIO SETUP ---
const introAudio = document.getElementById(
  "intro_sound",
) as HTMLAudioElement | null;

if (introAudio) {
  introAudio.volume = 0.2;
}

let shouldStartPlayback = false;

// --- START BUTTON ---
const startButton = document.getElementById("start_button");
const overlay = document.getElementById("first_interaction_grabber");

// --- YOUTUBE API LOAD ---
const tag = document.createElement("script");
tag.src = "https://www.youtube.com/iframe_api";
document.head.appendChild(tag);

// --- TYPES ---
declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
    YT: any;
  }
}

let player: any = null;
let ytReady = false;

// --- INIT PLAYER ---
window.onYouTubeIframeAPIReady = () => {
  player = new window.YT.Player("ytPlayer", {
    events: {
      onReady: (event: any) => {
        ytReady = true;
        event.target.setVolume(15);

        if (shouldStartPlayback) {
          event.target.playVideo();
        }
      },
    },
  });
};

// somewhat organize windows on start...
function organizeWindows() {
  const windows = Array.from(document.querySelectorAll<HTMLElement>(".window"));
  const gap = 15;
  const screenW = window.innerWidth;
  const screenH = window.innerHeight;

  const col1 = windows.filter(
    (w) =>
      w.innerText.includes("Guest book") ||
      w.innerText.includes("Active Users"),
  );
  const col2 = windows.filter(
    (w) => w.innerText.includes("Radio") || w.innerText.includes("Links"),
  );
  const col3 = windows.filter((w) => w.innerText.includes("Paint"));

  const w1 = col1[0]?.offsetWidth || 0;
  const w2 = col2[0]?.offsetWidth || 0;
  const w3 = col3[0]?.offsetWidth || 0;

  const totalBlockWidth = w1 + w2 + w3 + gap * 2;

  const isTooCramped = screenW < totalBlockWidth || screenH < 600;

  const animateWin = (
    win: HTMLElement,
    targetX: number,
    targetY: number,
    index: number,
  ) => {
    win.style.left = `${targetX}px`;
    win.style.top = `${targetY}px`;

    gsap.fromTo(
      win,
      {
        scale: 0.5,
        opacity: 0,
        x: (Math.random() - 0.5) * 200,
        y: (Math.random() - 0.5) * 200,
      },
      {
        x: 0,
        y: 0,
        scale: 1,
        opacity: 1,
        duration: 0.6,
        delay: index * 0.1,
        ease: "power4.out",
        onComplete: () => {
          gsap.set(win, { clearProps: "x,y" });
          if (typeof keepInBounds === "function") keepInBounds(win);
        },
      },
    );
  };

  if (isTooCramped) {
    windows.forEach((win, i) => {
      const randomX = Math.random() * (screenW - win.offsetWidth - 40) + 20;
      const randomY = Math.random() * (screenH - win.offsetHeight - 40) + 20;
      animateWin(win, randomX, randomY, i);
    });
  } else {
    let cursorX = (screenW - totalBlockWidth) / 2;
    [col1, col2, col3].forEach((col, colIdx) => {
      const colWidths = [w1, w2, w3];
      const colHeight =
        col.reduce((sum, w) => sum + w.offsetHeight + gap, 0) - gap;
      let cursorY = (screenH - colHeight) / 2;

      col.forEach((win, winIdx) => {
        animateWin(win, cursorX, cursorY, colIdx + winIdx);
        cursorY += win.offsetHeight + gap;
      });
      cursorX += colWidths[colIdx] + gap;
    });
  }
}

// --- START EXPERIENCE ON CLICK ---
startButton?.addEventListener("click", () => {
  overlay?.remove();

  shouldStartPlayback = true;

  if (player && ytReady) {
    player.playVideo();
  }

  organizeWindows();

  // 🔊 audio
  if (introAudio) {
    introAudio.currentTime = 0;
    introAudio.play().catch((e) => {
      console.error("Intro audio failed:", e);
    });
  }
});

// --- DRAGGING & WINDOW LOGIC ---
const windows = document.querySelectorAll<HTMLElement>(".window");
let activeWindow: HTMLElement | null = null;
let offsetX = 0,
  offsetY = 0;

const CURSOR_MOVE = "url('/cursors/Cursor_10.cur'), move";
const CURSOR_DEFAULT = "url('/cursors/arrow.cur'), auto";

let zCounter = 100;

function setActiveWindow(win: HTMLElement) {
  windows.forEach((w) => {
    const titleBar = w.querySelector<HTMLElement>(".title-bar");
    if (titleBar) titleBar.classList.add("inactive");
  });

  const titleBar = win.querySelector<HTMLElement>(".title-bar");
  if (titleBar) titleBar.classList.remove("inactive");

  zCounter += 1;
  win.style.zIndex = `${zCounter}`;
}

windows.forEach((win) => {
  if (win.dataset.notMoveable === "true") return;

  const titleBar = win.querySelector<HTMLElement>(".title-bar");
  if (!titleBar) return;

  titleBar.addEventListener("mousedown", (e) => {
    if (
      window.innerWidth <= 600 ||
      (e.target as HTMLElement).tagName === "BUTTON"
    )
      return;

    activeWindow = win;
    const rect = win.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;

    document.body.style.cursor = CURSOR_MOVE;
    win.style.cursor = CURSOR_MOVE;
    titleBar.style.cursor = CURSOR_MOVE;

    setActiveWindow(win);
  });

  titleBar.addEventListener("click", () => {
    setActiveWindow(win);
  });
});

document.addEventListener("mousemove", (e) => {
  if (!activeWindow) return;

  const rect = activeWindow.getBoundingClientRect();

  let newX = e.clientX - offsetX;
  let newY = e.clientY - offsetY;

  const taskbarHeight = 28;

  const maxX = window.innerWidth - rect.width;
  const maxY = window.innerHeight - rect.height - taskbarHeight;

  // Clamp
  newX = Math.max(0, Math.min(newX, maxX));
  newY = Math.max(0, Math.min(newY, maxY));

  gsap.to(activeWindow, {
    left: newX,
    top: newY,
    duration: 0.1,
    ease: "power1.out",
    overwrite: "auto",
  });
});

document.addEventListener("mouseup", () => {
  if (!activeWindow) return;

  document.body.style.cursor = "";
  const titleBar = activeWindow.querySelector<HTMLElement>(".title-bar");
  if (titleBar) titleBar.style.cursor = CURSOR_DEFAULT;

  activeWindow.style.cursor = CURSOR_DEFAULT;
  activeWindow = null;
});

// --- FOCUS (skip locked windows) ---
windows.forEach((win) => {
  win.addEventListener("mousedown", () => {
    if (win.dataset.notMoveable === "true") return;
    setActiveWindow(win);
  });
});

// --- CLOSE BUTTONS ---
document.querySelectorAll<HTMLElement>(".close").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
    const windowEl = target.closest(".window");

    if (!windowEl) return;

    if (target.dataset.redirect === "true") {
      window.location.href = "https://nikostuff.com";
      return;
    }

    windowEl.remove();
  });
});

// Other
function keepInBounds(windowElement: HTMLElement) {
  const rect = windowElement.getBoundingClientRect();

  if (rect.right > window.innerWidth) {
    windowElement.style.left = window.innerWidth - rect.width + "px";
  }
  if (rect.bottom > window.innerHeight) {
    windowElement.style.top = window.innerHeight - rect.height + "px";
  }
}

// Call this whenever the window is resized
window.addEventListener("resize", () => {
  const allWindows = document.querySelectorAll(".window");
  allWindows.forEach((win) => keepInBounds(win as HTMLElement));
});
