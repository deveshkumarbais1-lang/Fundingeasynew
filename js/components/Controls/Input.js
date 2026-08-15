// Input component for Admin Dashboard
export function Input({ type = 'text', placeholder = '', value = '', onChange, className = '' }) {
  const input = document.createElement('input');
  input.type = type;
  input.placeholder = placeholder;
  input.value = value;
  input.className = `adm-input ${className}`.trim();
  if (onChange) input.addEventListener('input', (e) => onChange(e.target.value));
  return input;
}
