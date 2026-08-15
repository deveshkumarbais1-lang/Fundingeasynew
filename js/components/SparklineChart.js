// SparklineChart component
// Renders a simple inline SVG sparkline given data points.
// Options: data (array of numbers), size (pixel size, default 120), strokeWidth (default 2), colorVar (CSS variable for stroke color)
export default class SparklineChart {
    /**
     * @param {Object} opts
     * @param {number[]} opts.data - Array of numeric data points
     * @param {number} [opts.size=120] - Width and height of the SVG canvas (square)
     * @param {number} [opts.strokeWidth=2] - Stroke width of the line
     * @param {string} [opts.colorVar='--inv-accent'] - CSS variable for stroke color
     */
    constructor({ data, size = 120, strokeWidth = 2, colorVar = '--inv-accent' } = {}) {
        this.data = data && data.length ? data : [0];
        this.size = size;
        this.strokeWidth = strokeWidth;
        this.colorVar = colorVar;
    }

    /**
     * Generate SVG markup for the sparkline.
     * @returns {string} SVG string
     */
    render() {
        const { data, size, strokeWidth, colorVar } = this;
        const maxVal = Math.max(...data, 1); // avoid division by zero
        const minVal = Math.min(...data);
        const range = maxVal - minVal || 1;
        const pointCount = data.length;
        const points = data.map((v, i) => {
            const x = (i / (pointCount - 1)) * size;
            // invert Y: higher values lower on the canvas
            const y = size - ((v - minVal) / range) * size;
            return `${x.toFixed(2)},${y.toFixed(2)}`;
        }).join(' ');
        // Empty state: flat line at 50% height if all values equal
        const empty = data.every(v => v === data[0]);
        const strokeColor = `var(${colorVar})`;
        const svg = `
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img">
    <polyline points="${points}" fill="none" stroke="${strokeColor}" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round" />
</svg>`;
        return empty ? `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg"><line x1="0" y1="${size/2}" x2="${size}" y2="${size/2}" stroke="${strokeColor}" stroke-width="${strokeWidth}"/></svg>` : svg;
    }
}
