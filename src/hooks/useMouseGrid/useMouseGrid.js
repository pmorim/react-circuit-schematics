import { useState, useEffect } from 'react';

export const useMouseGrid = (ref, gridSize) => {
  const [mousePosition, setMousePosition] = useState({ x: null, y: null });

  const snapToGrid = (pos, gridSize) => {
    const mod = pos % gridSize;
    if (mod < gridSize / 2) return pos - mod;
    return pos + (gridSize - mod);
  };

  const updateMousePosition = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const x = snapToGrid(e.clientX - rect.left, gridSize);
    const y = snapToGrid(e.clientY - rect.top, gridSize);

    if (x !== mousePosition.x || y !== mousePosition.y)
      setMousePosition({ x, y });
  };

  useEffect(() => {
    ref.current.addEventListener('mousemove', updateMousePosition);

    return () =>
      ref.current.removeEventListener('mousemove', updateMousePosition);
  }, []);

  return mousePosition;
};
