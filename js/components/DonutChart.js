// Inline SVG Donut Chart Component
// Usage: new DonutChart({percentage, size, strokeWidth, colorVar}).render()
// Returns an SVG string representing a circular progress donut.

class DonutChart {
  constructor({percentage = 0, size = 120, strokeWidth = 12, colorVar = '--brand-primary'} = {}) {
    this.percentage = Math.max(0, Math.min(percentage, 100));
    this.size = size;
    this.strokeWidth = strokeWidth;
    this.colorVar = colorVar; // CSS variable name for the stroke color
  }

  render() {
    const radius = (this.size - this.strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference * (1 - this.percentage / 100);
    const center = this.size / 2;
    const color = `var(${this.colorVar})`;
    return `
      <svg width="${this.size}" height="${this.size}" viewBox="0 0 ${this.size} ${this.size}" class="donut-chart" aria-label="Readiness ${this.percentage}%">
        <circle cx="${center}" cy="${center}" r="${radius}" stroke="var(--border-subtle)" stroke-width="${this.strokeWidth}" fill="none"/>
        <circle cx="${center}" cy="${center}" r="${radius}"
          stroke="${color}" stroke-width="${this.strokeWidth}" fill="none"
          stroke-dasharray="${circumference}"
          stroke-dashoffset="${offset}"
          stroke-linecap="round"
          transform="rotate(-90 ${center} ${center})"/>
        <text x="50%" y="50%" dy="0.3em" text-anchor="middle" font-size="${this.size * 0.25}" fill="var(--text-primary)" font-family="var(--font-sans)">${this.percentage}%</text>
      </svg>`;
  }
}

// Export for usage in other modules (if using import/export system)
export default DonutChart;
