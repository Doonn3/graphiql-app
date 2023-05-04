import React, { useState, useImperativeHandle, useRef } from 'react';

type ElemType = {
  left: number;
};

export interface IDivider {
  handler: (pos: number) => void;
  width?: number;
  left?: number;
  htmlElem: HTMLDivElement | null;
}

export const Divider = React.forwardRef<IDivider>((_, ref) => {
  const [elemStyle, setElemStyle] = useState<ElemType>({
    left: 0,
  });

  const ownRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => ({
    handler: move,
    width: ownRef.current?.getBoundingClientRect().width,
    left: ownRef.current?.getBoundingClientRect().left,
    htmlElem: ownRef.current,
  }));

  const move = (pos: number) => {
    setElemStyle({ left: pos });
  };

  return <div className="main__spacer" style={elemStyle} ref={ownRef}></div>;
});
