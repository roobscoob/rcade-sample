import './style.css'
import { PLAYER_1, PLAYER_2, STATUS, SYSTEM } from "@rcade/plugin-input-classic";


// Create display container
const container = document.createElement('div');
container.id = 'input-display';
container.style.cssText = `
  position: fixed;
  top: 20px;
  left: 20px;
  background: rgba(0, 0, 0, 0.85);
  color: #0f0;
  font-family: 'Courier New', monospace;
  font-size: 14px;
  padding: 20px;
  border-radius: 8px;
  border: 2px solid #0f0;
  z-index: 9999;
  line-height: 1.6;
  min-width: 300px;
`;
document.body.appendChild(container);

// Format boolean with color
function formatBool(value) {
  const color = value ? '#0f0' : '#666';
  return `<span style="color: ${color}">${value}</span>`;
}

// Format object recursively
function formatObject(obj, indent = 0) {
  const spaces = '  '.repeat(indent);
  let html = '';

  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'object' && value !== null) {
      html += `${spaces}${key}: {\n`;
      html += formatObject(value, indent + 1);
      html += `${spaces}}\n`;
    } else {
      html += `${spaces}${key}: ${formatBool(value)}\n`;
    }
  }

  return html;
}

// Update display every frame
function updateDisplay() {
  container.innerHTML = `
<div style="margin-bottom: 15px; border-bottom: 1px solid #0f0; padding-bottom: 10px;">
  <strong style="color: #fff;">STATUS</strong>
  <pre style="margin: 5px 0 0 0;">${formatObject(STATUS)}</pre>
</div>

<div style="margin-bottom: 15px; border-bottom: 1px solid #0f0; padding-bottom: 10px;">
  <strong style="color: #fff;">SYSTEM</strong>
  <pre style="margin: 5px 0 0 0;">${formatObject(SYSTEM)}</pre>
</div>

<div style="margin-bottom: 15px; border-bottom: 1px solid #0f0; padding-bottom: 10px;">
  <strong style="color: #fff;">PLAYER_1</strong>
  <pre style="margin: 5px 0 0 0;">${formatObject(PLAYER_1)}</pre>
</div>

<div>
  <strong style="color: #fff;">PLAYER_2</strong>
  <pre style="margin: 5px 0 0 0;">${formatObject(PLAYER_2)}</pre>
</div>
  `.trim();

  requestAnimationFrame(updateDisplay);
}

// Start the display loop
updateDisplay();