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
  const gap = 15;
  const screenW = window.innerWidth;
  const screenH = window.innerHeight;

  // 1. Helper to get element or null-safe measurements
  const getEl = (id: string) => document.getElementById(id);
  const dim = (el: HTMLElement | null) => ({
    w: el?.offsetWidth || 0,
    h: el?.offsetHeight || 0,
  });

  const winGuest = getEl("win-guestbook");
  const winActive = getEl("win-activeusers");
  const winRadio = getEl("win-radio");
  const winLinks = getEl("win-links");
  const winLanguage = getEl("win-language"); // Fixed typo
  const winPaint = getEl("win-paint");

  // 2. Measure everything once
  const dGuest = dim(winGuest);
  const dActive = dim(winActive);
  const dRadio = dim(winRadio);
  const dLinks = dim(winLinks);
  const dLang = dim(winLanguage);
  const dPaint = dim(winPaint);

  // 3. Define Column Widths
  const w1 = Math.max(dGuest.w, dActive.w);
  const w2_row = dLinks.w + dLang.w + gap;
  const w2 = Math.max(dRadio.w, w2_row);
  const w3 = dPaint.w;

  const totalBlockWidth = w1 + w2 + w3 + gap * 2;
  const isTooCramped = screenW < totalBlockWidth + 40 || screenH < 600;

  // 4. Fixed Type Definition (accepts null)
  const animateWin = (
    win: HTMLElement | null,
    x: number,
    y: number,
    delay: number,
  ) => {
    if (!win) return;
    gsap.fromTo(
      win,
      { scale: 0.5, opacity: 0, left: x, top: y },
      {
        left: x,
        top: y,
        scale: 1,
        opacity: 1,
        duration: 0.6,
        delay: delay * 0.1,
        ease: "power4.out",
      },
    );
  };

  if (isTooCramped) {
    const windows = Array.from(
      document.querySelectorAll<HTMLElement>(".window"),
    );
    windows.forEach((win, i) => {
      const rx = Math.random() * (screenW - win.offsetWidth - 40) + 20;
      const ry = Math.random() * (screenH - win.offsetHeight - 40) + 20;
      animateWin(win, rx, ry, i);
    });
  } else {
    const startX = (screenW - totalBlockWidth) / 2;

    // --- Column 1 ---
    const h1 = dGuest.h + dActive.h + gap;
    let c1Y = (screenH - h1) / 2;
    animateWin(winGuest, startX + (w1 - dGuest.w) / 2, c1Y, 0);
    animateWin(
      winActive,
      startX + (w1 - dActive.w) / 2,
      c1Y + dGuest.h + gap,
      1,
    );

    // --- Column 2 ---
    const h2 = dRadio.h + Math.max(dLinks.h, dLang.h) + gap;
    const c2X = startX + w1 + gap;
    const c2Y = (screenH - h2) / 2;
    const rowY = c2Y + dRadio.h + gap;
    const rowStartX = c2X + (w2 - w2_row) / 2;

    animateWin(winRadio, c2X + (w2 - dRadio.w) / 2, c2Y, 2);
    animateWin(winLinks, rowStartX, rowY, 3);
    animateWin(winLanguage, rowStartX + dLinks.w + gap, rowY, 4);

    // --- Column 3 ---
    animateWin(
      winPaint,
      startX + w1 + w2 + gap * 2,
      (screenH - dPaint.h) / 2,
      5,
    );
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
