/* ===== MySubaru Prototype — Shared JS ===== */

// Navigation helper
function navigateTo(page) {
  window.location.href = page;
}

// Slide-out menu
function openMenu() {
  document.querySelector('.menu-overlay')?.classList.add('open');
  document.querySelector('.slide-menu')?.classList.add('open');
}

function closeMenu() {
  document.querySelector('.menu-overlay')?.classList.remove('open');
  document.querySelector('.slide-menu')?.classList.remove('open');
}

// Toggle switches
document.addEventListener('change', (e) => {
  if (e.target.closest('.toggle input')) {
    const toggle = e.target;
    const label = toggle.closest('.list-row')?.querySelector('.row-label');
    if (label) {
      console.log(`${label.textContent}: ${toggle.checked ? 'ON' : 'OFF'}`);
    }
  }
});

// Stepper controls
function stepperChange(stepperId, delta) {
  const el = document.getElementById(stepperId);
  if (!el) return;
  let val = parseInt(el.textContent) + delta;
  if (val < 0) val = 0;
  if (val > 10) val = 10;
  el.textContent = val;
}

// Range slider live display
document.addEventListener('input', (e) => {
  if (e.target.classList.contains('range-slider')) {
    const display = document.getElementById(e.target.dataset.display);
    if (display) {
      display.textContent = e.target.value + (e.target.dataset.unit || '%');
    }
  }
});

// Toast notifications
function showNotification(title, body, duration = 4000) {
  const existing = document.querySelector('.notification-toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'notification-toast';
  toast.innerHTML = `
    <div class="notif-app">MYSUBARU</div>
    <div class="notif-title">${title}</div>
    <div class="notif-body">${body}</div>
  `;
  toast.style.position = 'fixed';
  toast.style.top = '0';
  toast.style.left = '50%';
  toast.style.transform = 'translateX(-50%) translateY(-100%)';
  toast.style.zIndex = '200';
  toast.style.maxWidth = '370px';
  toast.style.width = 'calc(100% - 32px)';
  toast.style.transition = 'transform 0.4s ease';

  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    toast.style.transform = 'translateX(-50%) translateY(16px)';
  });

  setTimeout(() => {
    toast.style.transform = 'translateX(-50%) translateY(-100%)';
    setTimeout(() => toast.remove(), 400);
  }, duration);
}

// Save setting simulation
function saveSetting(settingName) {
  showNotification('Setting Saved', `${settingName} has been updated successfully.`);
  setTimeout(() => history.back(), 1500);
}

// Back navigation
function goBack() {
  if (history.length > 1) {
    history.back();
  } else {
    navigateTo('index.html');
  }
}
