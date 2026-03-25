/* ===== MySubaru Prototype — App Logic ===== */

function navigateTo(page) { window.location.href = page; }

function goBack() {
  if (history.length > 1) history.back();
  else navigateTo('../index.html');
}

function openMenu() {
  document.querySelector('.overlay')?.classList.add('show');
  document.querySelector('.slide-menu')?.classList.add('show');
}

function closeMenu() {
  document.querySelector('.overlay')?.classList.remove('show');
  document.querySelector('.slide-menu')?.classList.remove('show');
}

function stepperChange(id, delta) {
  const el = document.getElementById(id);
  if (!el) return;
  let v = parseInt(el.textContent) + delta;
  el.textContent = Math.max(0, Math.min(10, v));
}

function showNotification(title, body) {
  const toast = document.querySelector('.notif-toast');
  if (!toast) return;
  toast.querySelector('.notif-title').textContent = title;
  toast.querySelector('.notif-body').textContent = body;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3500);
}

function saveSetting(name) {
  showNotification('Setting Saved', name + ' has been updated.');
  setTimeout(() => goBack(), 1800);
}
