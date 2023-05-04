import React, { useImperativeHandle, useRef, useState } from 'react';
import './style.layer.scss';

type LayerStyle = { width: number };

interface ILayerProps {
  children?: React.ReactNode;
}

export interface ILayer {
  handler: (width: number) => void;
  width?: number;
}

export const Layer = React.forwardRef<ILayer, ILayerProps>((props, ref) => {
  const [widthStyle, setWidthStyle] = useState<LayerStyle>({
    width: 0,
  });

  const ownRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => ({
    handler: changeWidth,
    width: ownRef.current?.getBoundingClientRect().width,
  }));

  const changeWidth = (val: number) => {
    setWidthStyle({ width: val });
  };

  return (
    <div className="layer" ref={ownRef} style={{ width: widthStyle.width }}>
      {props.children}
    </div>
  );
});
