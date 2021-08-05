import { useState, useEffect } from 'react';
import { snapToGrid } from '../../util';

export const useMouseGrid = (ref, gridSize) => {
  const [mousePosition, setMousePosition] = useState({ x: null, y: null });

  const updateMousePosition = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const x = snapToGrid(e.clientX - rect.left, gridSize);
    const y = snapToGrid(e.clientY - rect.top, gridSize);

    if (x !== mousePosition.x || y !== mousePosition.y)
      setMousePosition({ x, y });
  };

  useEffect(() => {
    ref?.current?.addEventListener('mousemove', updateMousePosition);

    return () =>
      ref?.current?.removeEventListener('mousemove', updateMousePosition);
  }, []);

  return mousePosition;
};
