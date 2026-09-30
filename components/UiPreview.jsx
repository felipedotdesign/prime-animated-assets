'use client';

import { useLayoutEffect, useRef, useState } from 'react';

export default function UiPreview({ width, height, label, children }) {
  const frameRef = useRef(null);
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    const frame = frameRef.current;
    if (!frame) return undefined;

    const updateScale = () => setScale(Math.min(1, frame.clientWidth / width));
    updateScale();
    const observer = new ResizeObserver(updateScale);
    observer.observe(frame);
    return () => observer.disconnect();
  }, [width]);

  return (
    <div
      ref={frameRef}
      className="ui-preview"
      style={{ height: `${height * scale}px` }}
      role="img"
      aria-label={label}
    >
      <div
        className="ui-preview__canvas"
        style={{ width: `${width}px`, height: `${height}px`, transform: `scale(${scale})` }}
      >
        {children}
      </div>
    </div>
  );
}
