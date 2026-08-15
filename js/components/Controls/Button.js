// Button component for Admin Dashboard
export function Button({ label, onClick, type = 'button', className = '' }) {
  const btn = document.createElement('button');
  btn.type = type;
  btn.className = `adm-btn ${className}`.trim();
  btn.textContent = label;
  if (onClick) btn.addEventListener('click', onClick);
  return btn;
}
