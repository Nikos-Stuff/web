function toggleModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal.classList.contains('show')) {
    closeModal(modalId);
  } else {
    closeAllModals(); // Ensure no other modals are open
    modal.style.display = 'flex'; // Show the targeted modal
    modal.classList.add('show');
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.classList.add('hide');
  modal.addEventListener('animationend', function handler() {
    if (modal.classList.contains('hide')) {
      modal.classList.remove('show', 'hide');
      modal.style.display = 'none'; // Hide modal
    }
    modal.removeEventListener('animationend', handler);
  });
}

function closeAllModals() {
  const modals = document.querySelectorAll('.modal.show');
  modals.forEach(modal => closeModal(modal.id));
}

function switchModal(currentModalId, targetModalId) {
  closeModal(currentModalId);
  const targetModal = document.getElementById(targetModalId);
  targetModal.style.display = 'flex'; // Show target modal
  targetModal.classList.add('show');
}
