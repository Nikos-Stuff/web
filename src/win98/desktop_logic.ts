let isSelecting = false;
let startX = 0;
let startY = 0;
const selectionBox = document.createElement("div");
selectionBox.classList.add("selection-box");

document.addEventListener("mousedown", (e) => {
  const target = e.target as HTMLElement;

  if (target.closest(".window") || target.closest(".taskbar")) return;

  isSelecting = true;
  startX = e.pageX;
  startY = e.pageY;

  selectionBox.style.left = `${startX}px`;
  selectionBox.style.top = `${startY}px`;
  selectionBox.style.width = `0px`;
  selectionBox.style.height = `0px`;
  document.body.appendChild(selectionBox);

  if (!e.shiftKey && !e.ctrlKey) {
    document
      .querySelectorAll(".desktop-icon")
      .forEach((icon) => icon.classList.remove("selected"));
  }
});

document.addEventListener("mousemove", (e) => {
  if (!isSelecting) return;

  const currentX = e.pageX;
  const currentY = e.pageY;

  const width = Math.abs(currentX - startX);
  const height = Math.abs(currentY - startY);
  const left = Math.min(currentX, startX);
  const top = Math.min(currentY, startY);

  selectionBox.style.width = `${width}px`;
  selectionBox.style.height = `${height}px`;
  selectionBox.style.left = `${left}px`;
  selectionBox.style.top = `${top}px`;

  // --- COLLISION DETECTION ---
  const icons = document.querySelectorAll<HTMLElement>(".desktop-icon");

  icons.forEach((icon) => {
    const iconRect = icon.getBoundingClientRect();
    const boxRect = selectionBox.getBoundingClientRect();

    const isOverlapping = !(
      boxRect.right < iconRect.left ||
      boxRect.left > iconRect.right ||
      boxRect.bottom < iconRect.top ||
      boxRect.top > iconRect.bottom
    );

    if (isOverlapping) {
      icon.classList.add("selected");
    } else if (!e.shiftKey && !e.ctrlKey) {
      icon.classList.remove("selected");
    }
  });
});

document.addEventListener("mouseup", () => {
  isSelecting = false;
  if (selectionBox.parentNode) {
    selectionBox.remove();
  }
});

// --- ICON CLICK LOGIC ---
document.querySelector('.desktop-icons')?.addEventListener('mousedown', (event: Event) => {
    const e = event as MouseEvent; 
    
    const icon = (e.target as HTMLElement).closest('.desktop-icon');
    if (!icon) return;

    e.stopPropagation(); 
    
    if (!e.ctrlKey && !e.shiftKey) {
        document.querySelectorAll('.desktop-icon').forEach(i => i.classList.remove('selected'));
    }
    icon.classList.add('selected');
});