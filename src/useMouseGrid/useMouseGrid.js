import { useState, useEffect } from 'react';

export const useMouseGrid = (ref, gridSize) => {
  const [mousePosition, setMousePosition] = useState({ x: null, y: null });

  const snapToGrid = (pos, gridSize) => {
    const mod = pos % gridSize;
    if (mod < gridSize / 2) return pos - mod;
    return pos + (gridSize - mod);
  };

  const updateMousePosition = (e) => {
    let rect = ref.current.getBoundingClientRect();
    setMousePosition({
      x: snapToGrid(e.clientX - rect.left, gridSize),
      y: snapToGrid(e.clientY - rect.top, gridSize),
    });
  };

  useEffect(() => {
    ref.current.addEventListener('mousemove', updateMousePosition);

    return () =>
      ref.current.removeEventListener('mousemove', updateMousePosition);
  }, []);

  return mousePosition;
};
