import React, { useImperativeHandle, useRef, useState } from 'react';
import style from './layout.module.scss';

export interface ILayoutProps {
  children?: React.ReactNode;
}

type LayerSize = { width?: number; height?: number };

export interface ILayout {
  handlerChange: (size: LayerSize) => void;
  width?: number;
  height?: number;
  top?: number;
}

const Layout = React.forwardRef<ILayout, ILayoutProps>((props, ref) => {
  const ownRef = useRef<HTMLDivElement>(null);

  const [whStyle, setwhStyle] = useState<LayerSize>({});

  useImperativeHandle(ref, () => ({
    handlerChange: resize,
    width: ownRef.current?.getBoundingClientRect().width,
    height: ownRef.current?.getBoundingClientRect().height,
  }));

  const resize = (size: LayerSize) => {
    const { width, height } = size;

    setwhStyle({ width, height });
  };

  return (
    <div
      className={style.layout}
      ref={ownRef}
      style={
        whStyle.width === undefined && whStyle.height === undefined
          ? {}
          : { width: whStyle.width + '%', height: whStyle.height + '%' }
      }
    >
      {props.children}
    </div>
  );
});

export default Layout;
