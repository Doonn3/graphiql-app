import { useState } from 'react';

type PositionType = {
  X: number;
  Y: number;
};

const useResizePanel = (position: PositionType = { X: 0, Y: 0 }) => {
  const [startPos, setStartPos] = useState<PositionType>(position);
  const [direction, setDirection] = useState<PositionType>(position);
  const [pos, setPos] = useState<PositionType>(position);
  const [isMouseDown, setIsMouseDown] = useState(false);

  function start(event: React.MouseEvent) {
    setIsMouseDown(true);
    setStartPos({ X: event.clientX, Y: event.clientY });
  }

  function move(event: React.MouseEvent) {
    if (isMouseDown === false) return;
    setPos({ X: event.clientX, Y: event.clientY });
    setDirection({ X: event.movementX, Y: event.movementY });
  }

  function end() {
    setIsMouseDown(false);
  }

  return {
    direction,
    startPos,
    pos,
    start,
    move,
    end,
  };
};

export default useResizePanel;
