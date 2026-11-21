import React from 'react';
import { MaterialType, WindowType } from '../types/quotation';

interface WindowSchematicProps {
  material: MaterialType;
  windowType: WindowType;
  widthMm: number;
  heightMm: number;
  areaSqFt: number;
  className?: string;
  compact?: boolean;
}

export const WindowSchematic: React.FC<WindowSchematicProps> = ({
  material,
  windowType,
  widthMm,
  heightMm,
  areaSqFt,
  className = '',
  compact = false,
}) => {
  // Compute normalized aspect ratio box
  const safeW = Math.max(300, widthMm || 1000);
  const safeH = Math.max(300, heightMm || 1000);
  const aspectRatio = safeW / safeH;

  // Frame outer dimensions inside SVG (leave space for dimension lines)
  const svgWidth = 280;
  const svgHeight = compact ? 160 : 180;
  const paddingX = 40;
  const paddingY = 32;

  const maxDrawW = svgWidth - paddingX * 2;
  const maxDrawH = svgHeight - paddingY * 2;

  let drawW = maxDrawW;
  let drawH = drawW / aspectRatio;

  if (drawH > maxDrawH) {
    drawH = maxDrawH;
    drawW = drawH * aspectRatio;
  }

  // Centering inside drawing area
  const startX = paddingX + (maxDrawW - drawW) / 2;
  const startY = paddingY + (maxDrawH - drawH) / 2;

  // Frame colors based on material
  const frameColor = material === 'UPVC' ? '#334155' : '#1e293b';
  const frameFill = material === 'UPVC' ? '#f8fafc' : '#f1f5f9';
  const glassFill = '#e0f2fe';
  const glassBorder = '#93c5fd';
  const sashBorder = '#475569';
  const dimensionColor = '#64748b';

  // Render interior panels and sash details based on window type
  const renderWindowPanels = () => {
    const frameThickness = 6;
    const innerX = startX + frameThickness;
    const innerY = startY + frameThickness;
    const innerW = drawW - frameThickness * 2;
    const innerH = drawH - frameThickness * 2;

    switch (windowType) {
      case '2 Track':
      case '2 Track (2 Shutter)': {
        const halfW = innerW / 2;
        return (
          <g>
            {/* Shutter 1 (Left, Front Track) */}
            <rect
              x={innerX + 1}
              y={innerY + 1}
              width={halfW + 3}
              height={innerH - 2}
              fill={glassFill}
              stroke={sashBorder}
              strokeWidth="2"
            />
            {/* Glass reflection line */}
            <line
              x1={innerX + 6}
              y1={innerY + 10}
              x2={innerX + halfW - 6}
              y2={innerY + innerH - 12}
              stroke={glassBorder}
              strokeWidth="1.5"
              strokeDasharray="4 8"
            />
            {/* Slide arrow left */}
            <path
              d={`M ${innerX + 12} ${innerY + innerH / 2} L ${innerX + 28} ${innerY + innerH / 2} M ${innerX + 18} ${innerY + innerH / 2 - 4} L ${innerX + 12} ${innerY + innerH / 2} L ${innerX + 18} ${innerY + innerH / 2 + 4}`}
              stroke="#0369a1"
              strokeWidth="1.5"
              fill="none"
            />
            {/* Handle */}
            <rect
              x={innerX + halfW - 4}
              y={innerY + innerH / 2 - 8}
              width="3"
              height="16"
              rx="1.5"
              fill="#0f172a"
            />

            {/* Shutter 2 (Right, Rear Track) */}
            <rect
              x={innerX + halfW}
              y={innerY + 1}
              width={halfW - 1}
              height={innerH - 2}
              fill={glassFill}
              stroke={sashBorder}
              strokeWidth="2"
            />
            <line
              x1={innerX + halfW + 6}
              y1={innerY + 10}
              x2={innerX + innerW - 6}
              y2={innerY + innerH - 12}
              stroke={glassBorder}
              strokeWidth="1.5"
              strokeDasharray="4 8"
            />
            {/* Slide arrow right */}
            <path
              d={`M ${innerX + innerW - 28} ${innerY + innerH / 2} L ${innerX + innerW - 12} ${innerY + innerH / 2} M ${innerX + innerW - 18} ${innerY + innerH / 2 - 4} L ${innerX + innerW - 12} ${innerY + innerH / 2} L ${innerX + innerW - 18} ${innerY + innerH / 2 + 4}`}
              stroke="#0369a1"
              strokeWidth="1.5"
              fill="none"
            />
            {/* Handle */}
            <rect
              x={innerX + halfW + 2}
              y={innerY + innerH / 2 - 8}
              width="3"
              height="16"
              rx="1.5"
              fill="#0f172a"
            />
          </g>
        );
      }

      case '2 Track (4 Shutter)': {
        const paneW = innerW / 4;
        return (
          <g>
            {[0, 1, 2, 3].map((i) => (
              <g key={i}>
                <rect
                  x={innerX + i * paneW}
                  y={innerY + 1}
                  width={paneW}
                  height={innerH - 2}
                  fill={glassFill}
                  stroke={sashBorder}
                  strokeWidth="1.5"
                />
                <line
                  x1={innerX + i * paneW + 4}
                  y1={innerY + 8}
                  x2={innerX + (i + 1) * paneW - 4}
                  y2={innerY + innerH - 10}
                  stroke={glassBorder}
                  strokeWidth="1"
                  strokeDasharray="3 5"
                />
              </g>
            ))}
            {/* Meeting handles in center */}
            <rect
              x={innerX + 2 * paneW - 4}
              y={innerY + innerH / 2 - 8}
              width="3"
              height="16"
              rx="1.5"
              fill="#0f172a"
            />
            <rect
              x={innerX + 2 * paneW + 1}
              y={innerY + innerH / 2 - 8}
              width="3"
              height="16"
              rx="1.5"
              fill="#0f172a"
            />
          </g>
        );
      }

      case '3 Track':
      case '3 Track (3 Shutter)':
      case '3 Track (2 Shutter)': {
        const thirdW = innerW / 3;
        const isMesh = windowType === '3 Track (2 Shutter)';
        return (
          <g>
            {/* Shutter 1 */}
            <rect
              x={innerX + 1}
              y={innerY + 1}
              width={thirdW}
              height={innerH - 2}
              fill={glassFill}
              stroke={sashBorder}
              strokeWidth="1.5"
            />
            {/* Shutter 2 */}
            <rect
              x={innerX + thirdW}
              y={innerY + 1}
              width={thirdW}
              height={innerH - 2}
              fill={glassFill}
              stroke={sashBorder}
              strokeWidth="1.5"
            />
            {/* Shutter 3 (Mesh pattern or glass) */}
            <rect
              x={innerX + thirdW * 2}
              y={innerY + 1}
              width={thirdW - 1}
              height={innerH - 2}
              fill={isMesh ? '#e2e8f0' : glassFill}
              stroke={sashBorder}
              strokeWidth="1.5"
            />
            {isMesh && (
              <text
                x={innerX + thirdW * 2 + thirdW / 2}
                y={innerY + innerH / 2 + 4}
                fontSize="8"
                fill="#475569"
                textAnchor="middle"
                fontWeight="500"
              >
                MESH
              </text>
            )}
            {/* 3-track sliding marks */}
            <path
              d={`M ${innerX + 6} ${innerY + innerH / 2} L ${innerX + 18} ${innerY + innerH / 2}`}
              stroke="#0284c7"
              strokeWidth="1.2"
            />
            <path
              d={`M ${innerX + thirdW + 6} ${innerY + innerH / 2} L ${innerX + thirdW + 18} ${innerY + innerH / 2}`}
              stroke="#0284c7"
              strokeWidth="1.2"
            />
          </g>
        );
      }

      case '3 Track (4 Shutter)': {
        const paneW = innerW / 4;
        return (
          <g>
            {[0, 1, 2, 3].map((i) => (
              <rect
                key={i}
                x={innerX + i * paneW}
                y={innerY + 1}
                width={paneW}
                height={innerH - 2}
                fill={i === 0 || i === 3 ? '#e0f2fe' : '#f0f9ff'}
                stroke={sashBorder}
                strokeWidth="1.5"
              />
            ))}
          </g>
        );
      }

      case 'Openable': {
        // Casement window with architectural hinge dashed lines
        return (
          <g>
            <rect
              x={innerX + 1}
              y={innerY + 1}
              width={innerW - 2}
              height={innerH - 2}
              fill={glassFill}
              stroke={sashBorder}
              strokeWidth="2"
            />
            {/* Casement swing dashed triangle */}
            <polyline
              points={`${innerX + 4},${innerY + 4} ${innerX + innerW - 6},${innerY + innerH / 2} ${innerX + 4},${innerY + innerH - 4}`}
              fill="none"
              stroke="#0284c7"
              strokeWidth="1.5"
              strokeDasharray="4 3"
            />
            {/* Casement handle */}
            <rect
              x={innerX + innerW - 10}
              y={innerY + innerH / 2 - 10}
              width="4"
              height="20"
              rx="2"
              fill="#0f172a"
            />
            <circle
              cx={innerX + innerW - 8}
              cy={innerY + innerH / 2}
              r="2"
              fill="#ffffff"
            />
          </g>
        );
      }

      case 'French Door': {
        const halfW = innerW / 2;
        return (
          <g>
            {/* Left Door Leaf */}
            <rect
              x={innerX + 1}
              y={innerY + 1}
              width={halfW - 2}
              height={innerH - 2}
              fill={glassFill}
              stroke={sashBorder}
              strokeWidth="2"
            />
            {/* Left swing triangle */}
            <polyline
              points={`${innerX + 3},${innerY + 6} ${innerX + halfW - 4},${innerY + innerH / 2} ${innerX + 3},${innerY + innerH - 6}`}
              fill="none"
              stroke="#0284c7"
              strokeWidth="1.5"
              strokeDasharray="4 3"
            />
            {/* Left door handle */}
            <rect
              x={innerX + halfW - 8}
              y={innerY + innerH / 2 - 10}
              width="4"
              height="20"
              rx="2"
              fill="#0f172a"
            />

            {/* Right Door Leaf */}
            <rect
              x={innerX + halfW + 1}
              y={innerY + 1}
              width={halfW - 2}
              height={innerH - 2}
              fill={glassFill}
              stroke={sashBorder}
              strokeWidth="2"
            />
            {/* Right swing triangle */}
            <polyline
              points={`${innerX + innerW - 3},${innerY + 6} ${innerX + halfW + 4},${innerY + innerH / 2} ${innerX + innerW - 3},${innerY + innerH - 6}`}
              fill="none"
              stroke="#0284c7"
              strokeWidth="1.5"
              strokeDasharray="4 3"
            />
            {/* Right door handle */}
            <rect
              x={innerX + halfW + 4}
              y={innerY + innerH / 2 - 10}
              width="4"
              height="20"
              rx="2"
              fill="#0f172a"
            />
            {/* Central Dummy Mullion line */}
            <line
              x1={innerX + halfW}
              y1={innerY}
              x2={innerX + halfW}
              y2={innerY + innerH}
              stroke="#0f172a"
              strokeWidth="2"
            />
          </g>
        );
      }

      case 'Glazing': {
        // Fixed Structural Glazing with subtle diagonal reflection
        return (
          <g>
            <rect
              x={innerX + 1}
              y={innerY + 1}
              width={innerW - 2}
              height={innerH - 2}
              fill={glassFill}
              stroke={sashBorder}
              strokeWidth="1.5"
            />
            <line
              x1={innerX + 8}
              y1={innerY + 12}
              x2={innerX + innerW - 8}
              y2={innerY + innerH - 12}
              stroke={glassBorder}
              strokeWidth="1.5"
              strokeDasharray="5 7"
            />
            <text
              x={innerX + innerW / 2}
              y={innerY + innerH / 2 + 4}
              fontSize="9"
              fill="#64748b"
              textAnchor="middle"
              fontWeight="600"
              letterSpacing="0.05em"
            >
              FIXED GLASS
            </text>
          </g>
        );
      }

      case 'Partition': {
        // Office partition: Upper glass section, Lower solid kick-plate
        const splitY = innerY + innerH * 0.65;
        const halfW = innerW / 2;
        return (
          <g>
            {/* Upper Glass Section Left */}
            <rect
              x={innerX + 1}
              y={innerY + 1}
              width={halfW - 1}
              height={innerH * 0.65 - 1}
              fill={glassFill}
              stroke={sashBorder}
              strokeWidth="1.5"
            />
            {/* Upper Glass Section Right */}
            <rect
              x={innerX + halfW}
              y={innerY + 1}
              width={halfW - 1}
              height={innerH * 0.65 - 1}
              fill={glassFill}
              stroke={sashBorder}
              strokeWidth="1.5"
            />
            {/* Middle Transom bar */}
            <line
              x1={innerX}
              y1={splitY}
              x2={innerX + innerW}
              y2={splitY}
              stroke="#1e293b"
              strokeWidth="3"
            />
            {/* Lower Solid Kick Panel Left */}
            <rect
              x={innerX + 1}
              y={splitY + 2}
              width={halfW - 1}
              height={innerH * 0.35 - 3}
              fill="#cbd5e1"
              stroke={sashBorder}
              strokeWidth="1.5"
            />
            {/* Lower Solid Kick Panel Right */}
            <rect
              x={innerX + halfW}
              y={splitY + 2}
              width={halfW - 1}
              height={innerH * 0.35 - 3}
              fill="#cbd5e1"
              stroke={sashBorder}
              strokeWidth="1.5"
            />
            <text
              x={innerX + innerW / 2}
              y={splitY + innerH * 0.18}
              fontSize="7"
              fill="#475569"
              textAnchor="middle"
              fontWeight="600"
            >
              ALUM. PANEL
            </text>
          </g>
        );
      }

      default:
        return (
          <rect
            x={innerX + 1}
            y={innerY + 1}
            width={innerW - 2}
            height={innerH - 2}
            fill={glassFill}
            stroke={sashBorder}
            strokeWidth="1.5"
          />
        );
    }
  };

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <svg
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        className="w-full h-auto max-w-[280px] select-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background Canvas */}
        <rect width={svgWidth} height={svgHeight} fill="#f8fafc" rx="6" />

        {/* Outer Frame */}
        <rect
          x={startX}
          y={startY}
          width={drawW}
          height={drawH}
          fill={frameFill}
          stroke={frameColor}
          strokeWidth="3.5"
          rx="1"
        />

        {/* Window Type Specific Panels & Details */}
        {renderWindowPanels()}

        {/* --- Top Dimension Line (Width) --- */}
        <g stroke={dimensionColor} strokeWidth="1">
          {/* Extension witness lines */}
          <line x1={startX} y1={startY - 2} x2={startX} y2={startY - 14} />
          <line x1={startX + drawW} y1={startY - 2} x2={startX + drawW} y2={startY - 14} />
          {/* Main dimension line */}
          <line x1={startX + 4} y1={startY - 10} x2={startX + drawW - 4} y2={startY - 10} />
          {/* Arrows */}
          <polygon
            points={`${startX},${startY - 10} ${startX + 5},${startY - 12} ${startX + 5},${startY - 8}`}
            fill={dimensionColor}
          />
          <polygon
            points={`${startX + drawW},${startY - 10} ${startX + drawW - 5},${startY - 12} ${startX + drawW - 5},${startY - 8}`}
            fill={dimensionColor}
          />
        </g>
        {/* Width text label */}
        <text
          x={startX + drawW / 2}
          y={startY - 14}
          fill="#0f172a"
          fontSize="9"
          fontFamily="monospace"
          fontWeight="600"
          textAnchor="middle"
        >
          {widthMm} mm
        </text>

        {/* --- Right Dimension Line (Height) --- */}
        <g stroke={dimensionColor} strokeWidth="1">
          {/* Extension witness lines */}
          <line x1={startX + drawW + 2} y1={startY} x2={startX + drawW + 14} y2={startY} />
          <line x1={startX + drawW + 2} y1={startY + drawH} x2={startX + drawW + 14} y2={startY + drawH} />
          {/* Main dimension line */}
          <line x1={startX + drawW + 10} y1={startY + 4} x2={startX + drawW + 10} y2={startY + drawH - 4} />
          {/* Arrows */}
          <polygon
            points={`${startX + drawW + 10},${startY} ${startX + drawW + 8},${startY + 5} ${startX + drawW + 12},${startY + 5}`}
            fill={dimensionColor}
          />
          <polygon
            points={`${startX + drawW + 10},${startY + drawH} ${startX + drawW + 8},${startY + drawH - 5} ${startX + drawW + 12},${startY + drawH - 5}`}
            fill={dimensionColor}
          />
        </g>
        {/* Height text label (rotated) */}
        <text
          x={startX + drawW + 24}
          y={startY + drawH / 2 + 3}
          fill="#0f172a"
          fontSize="9"
          fontFamily="monospace"
          fontWeight="600"
          textAnchor="middle"
          transform={`rotate(90, ${startX + drawW + 24}, ${startY + drawH / 2})`}
        >
          {heightMm} mm
        </text>

        {/* Bottom Area Badge */}
        <g>
          <rect
            x={svgWidth / 2 - 42}
            y={svgHeight - 16}
            width="84"
            height="13"
            rx="3"
            fill="#e2e8f0"
          />
          <text
            x={svgWidth / 2}
            y={svgHeight - 7}
            fill="#1e293b"
            fontSize="8"
            fontFamily="monospace"
            fontWeight="600"
            textAnchor="middle"
          >
            {areaSqFt.toFixed(2)} SQ.FT
          </text>
        </g>
      </svg>
    </div>
  );
};

