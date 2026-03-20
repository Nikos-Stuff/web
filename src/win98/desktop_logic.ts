const GRID_SIZE_X = 85;
const GRID_SIZE_Y = 90;
const OFFSET_PADDING = 10;
const TASKBAR_HEIGHT = 28;

let isSelecting = false;
let isDragging = false;
let dragTarget: HTMLElement | null = null;
let dragOffset = { x: 0, y: 0 };
let originalX = 0;
let originalY = 0;

let startX = 0;
let startY = 0;
const selectionBox = document.createElement("div") as HTMLElement;
const desktopMenu = document.getElementById("desktop-menu") as HTMLElement;
selectionBox.classList.add("selection-box");

const clamp = (val: number, min: number, max: number) =>
  Math.max(min, Math.min(max, val));

const isSpaceOccupied = (
  x: number,
  y: number,
  excludeIcon: HTMLElement | null,
) => {
  const icons = document.querySelectorAll<HTMLElement>(".desktop-icon");
  return Array.from(icons).some((icon) => {
    if (icon === excludeIcon) return false;
    return (
      parseFloat(icon.style.left) === x && parseFloat(icon.style.top) === y
    );
  });
};

const snapToGrid = (x: number, y: number) => {
  const maxX = window.innerWidth - GRID_SIZE_X - OFFSET_PADDING;
  const maxY =
    window.innerHeight - GRID_SIZE_Y - TASKBAR_HEIGHT - OFFSET_PADDING;

  let snappedX =
    Math.round((x - OFFSET_PADDING) / GRID_SIZE_X) * GRID_SIZE_X +
    OFFSET_PADDING;
  let snappedY =
    Math.round((y - OFFSET_PADDING) / GRID_SIZE_Y) * GRID_SIZE_Y +
    OFFSET_PADDING;

  return {
    x: clamp(snappedX, OFFSET_PADDING, maxX),
    y: clamp(snappedY, OFFSET_PADDING, maxY),
  };
};

const initializeIcons = () => {
  const icons = document.querySelectorAll<HTMLElement>(".desktop-icon");
  const availableHeight =
    window.innerHeight - TASKBAR_HEIGHT - OFFSET_PADDING * 2;
  const iconsPerCol = Math.max(1, Math.floor(availableHeight / GRID_SIZE_Y));

  icons.forEach((icon, index) => {
    const col = Math.floor(index / iconsPerCol);
    const row = index % iconsPerCol;

    icon.style.left = `${col * GRID_SIZE_X + OFFSET_PADDING}px`;
    icon.style.top = `${row * GRID_SIZE_Y + OFFSET_PADDING}px`;
  });
};

// Start logic
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeIcons);
} else {
  initializeIcons();
}

document.addEventListener("mousedown", (e) => {
  const target = e.target as HTMLElement;
  const icon = target.closest(".desktop-icon") as HTMLElement;

  if (
    target.closest(".window") ||
    target.closest(".taskbar") ||
    target.closest(".cf-turnstile")
  )
    return;

  if (desktopMenu && !desktopMenu.contains(e.target as Node)) {
    desktopMenu.style.display = "none";
  }

  if (icon) {
    isDragging = true;
    dragTarget = icon;

    originalX = parseFloat(icon.style.left);
    originalY = parseFloat(icon.style.top);

    const rect = icon.getBoundingClientRect();

    dragOffset.x = e.clientX - rect.left;
    dragOffset.y = e.clientY - rect.top;

    icon.classList.add("dragging");

    if (!e.shiftKey && !e.ctrlKey) {
      document
        .querySelectorAll(".desktop-icon")
        .forEach((i) => i.classList.remove("selected"));
    }
    icon.classList.add("selected");
  } else {
    isSelecting = true;
    startX = e.clientX;
    startY = e.clientY;

    selectionBox.style.left = `${startX}px`;
    selectionBox.style.top = `${startY}px`;
    selectionBox.style.width = `0px`;
    selectionBox.style.height = `0px`;
    document.body.appendChild(selectionBox);

    if (!e.shiftKey && !e.ctrlKey) {
      document
        .querySelectorAll(".desktop-icon")
        .forEach((i) => i.classList.remove("selected"));
    }
  }
});

document.addEventListener("mousemove", (e) => {
  if (isDragging && dragTarget) {
    const x = e.clientX - dragOffset.x;
    const y = e.clientY - dragOffset.y;

    dragTarget.style.left = `${x}px`;
    dragTarget.style.top = `${y}px`;
    return;
  }

  if (isSelecting) {
    const currentX = e.clientX;
    const currentY = e.clientY;

    const width = Math.abs(currentX - startX);
    const height = Math.abs(currentY - startY);
    const left = Math.min(currentX, startX);
    const top = Math.min(currentY, startY);

    selectionBox.style.width = `${width}px`;
    selectionBox.style.height = `${height}px`;
    selectionBox.style.left = `${left}px`;
    selectionBox.style.top = `${top}px`;

    const boxRect = selectionBox.getBoundingClientRect();
    document.querySelectorAll<HTMLElement>(".desktop-icon").forEach((icon) => {
      const iconRect = icon.getBoundingClientRect();
      const isOverlapping = !(
        boxRect.right < iconRect.left ||
        boxRect.left > iconRect.right ||
        boxRect.bottom < iconRect.top ||
        boxRect.top > iconRect.bottom
      );

      if (isOverlapping) icon.classList.add("selected");
      else if (!e.shiftKey && !e.ctrlKey) icon.classList.remove("selected");
    });
  }
});

document.addEventListener("mouseup", () => {
  if (isDragging && dragTarget) {
    const curX = parseFloat(dragTarget.style.left);
    const curY = parseFloat(dragTarget.style.top);
    const snapped = snapToGrid(curX, curY);

    const occupied = isSpaceOccupied(snapped.x, snapped.y, dragTarget);

    dragTarget.style.left = `${occupied ? originalX : snapped.x}px`;
    dragTarget.style.top = `${occupied ? originalY : snapped.y}px`;

    dragTarget.classList.remove("dragging");
    isDragging = false;
    dragTarget = null;
  }

  isSelecting = false;
  selectionBox.remove();
});

window.addEventListener("resize", () => {
  document.querySelectorAll<HTMLElement>(".desktop-icon").forEach((icon) => {
    const curX = parseFloat(icon.style.left);
    const curY = parseFloat(icon.style.top);

    // snapToGrid already has the 'clamp' logic built-in to handle maxX/maxY
    const corrected = snapToGrid(curX, curY);

    icon.style.left = `${corrected.x}px`;
    icon.style.top = `${corrected.y}px`;
  });
});

document.addEventListener("contextmenu", (e: MouseEvent) => {
  const target = e.target as HTMLElement;

  if (
    target.closest(".window") ||
    target.closest(".taskbar") ||
    target.closest(".cf-turnstile")
  ) {
    if (desktopMenu) desktopMenu.style.display = "none";
    return;
  }

  e.preventDefault();

  if (!desktopMenu) return;

  desktopMenu.style.display = "block";

  const { clientX: mouseX, clientY: mouseY } = e;
  const menuRect = desktopMenu.getBoundingClientRect();

  let finalX = mouseX;
  let finalY = mouseY;

  if (mouseX + menuRect.width > window.innerWidth) {
    finalX = mouseX - menuRect.width;
  }

  if (mouseY + menuRect.height > window.innerHeight - TASKBAR_HEIGHT) {
    finalY = mouseY - menuRect.height;
  }

  desktopMenu.style.left = `${finalX}px`;
  desktopMenu.style.top = `${finalY}px`;
});
