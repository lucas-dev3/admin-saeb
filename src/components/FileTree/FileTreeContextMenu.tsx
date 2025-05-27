import React, { useRef } from 'react';

export interface ContextMenuItem {
  name: string;
  onClick: () => void;
  icon?: React.ReactNode;
  disabled?: boolean;
}

interface FileTreeContextMenuProps {
  x: number;
  y: number;
  options: ContextMenuItem[];
  onClose: () => void;
}

const menuStyle: React.CSSProperties = {
  position: 'fixed',
  background: '#FFFFFF',
  color: '#6a7282',
  borderRadius: 6,
  boxShadow: '0 2px 12px rgba(0,0,0,0.15)',
  minWidth: 160,
  zIndex: 10001,
  padding: '4px',
  fontFamily: 'Fira Mono, Consolas, Menlo, monospace',
  fontSize: 14,
};

const backdropStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  zIndex: 10000,
  background: 'transparent',
};

const itemStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  padding: '6px 12px',
  borderRadius: 4,
  cursor: 'pointer',
  userSelect: 'none',
  transition: 'background 0.2s, color 0.2s',
};

const itemDisabledStyle: React.CSSProperties = {
  ...itemStyle,
  color: '#888',
  cursor: 'not-allowed',
};

export const FileTreeContextMenu: React.FC<FileTreeContextMenuProps> = ({ x, y, options, onClose }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = React.useState<number | null>(null);

  return (
    <div style={backdropStyle} onClick={e => { e.stopPropagation(); e.preventDefault(); onClose(); }}>
      <div
        ref={ref}
        style={{ ...menuStyle, top: y, left: x }}
        onClick={e => e.stopPropagation()}
      >
        {options.map((item, idx) => (
          <div
            key={item.name + idx}
            style={{
              ...(item.disabled ? itemDisabledStyle : itemStyle),
              ...(hovered === idx && !item.disabled
                ? { background: '#f5f5f5', color: '#222c37' }
                : {}),
            }}
            onClick={() => {
              if (!item.disabled) {
                item.onClick();
                onClose();
              }
            }}
            onMouseEnter={() => setHovered(idx)}
            onMouseLeave={() => setHovered(null)}
          >
            {item.icon && <span style={{ marginRight: 12 }}>{item.icon}</span>}
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
}; 