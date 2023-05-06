import React, { useRef, useState } from 'react';
import { ILayout } from '../Layout/Layout';
import style from './horizontalLayout.module.scss';

interface ILayerProps {
  children?: React.ReactNode;
  ref?: React.RefObject<ILayout>;
}

function HorizontalResizePanel(props: ILayerProps) {
  const ownRef = useRef<HTMLDivElement>(null);
  const refDivider = useRef<HTMLDivElement>(null);
  const layoutRefs = useRef(React.Children.map(props.children, () => React.createRef<ILayout>()));

  const [isDraggable, setDragging] = useState(false);

  const handlerMouseDown = (event: React.MouseEvent) => {
    if (event.target === refDivider.current) {
      setDragging(true);
    }
  };

  const handlerMouseMove = (event: React.MouseEvent) => {
    if (isDraggable === false) return;

    if (!layoutRefs.current) return;
    const layout1 = layoutRefs.current[0];
    const height1 = layout1.current?.height as number;
    const newHeight = height1 + event.movementY;
    const layout2 = layoutRefs.current[1];
    const height2 = layout2.current?.height as number;
    const newHeight2 = height2 - event.movementY;

    layout1.current?.handlerChange({ height: newHeight });
    layout2.current?.handlerChange({ height: newHeight2 });
  };

  const handlerMouseUp = () => {
    setDragging(false);
  };

  const divider = <div className={style.divider} ref={refDivider}></div>;

  const childrenWithDividers = React.Children.map(props.children, (child, index) => {
    if (!layoutRefs.current) return child;
    return (
      <>
        {React.cloneElement(child as React.ReactElement<ILayerProps>, {
          ref: layoutRefs.current[index],
        })}
        {index < React.Children.count(props.children) - 1 && divider}
      </>
    );
  });

  return (
    <div
      className={style.horizontal}
      onMouseDown={handlerMouseDown}
      onMouseMove={handlerMouseMove}
      onMouseUp={handlerMouseUp}
      ref={ownRef}
    >
      {childrenWithDividers}
    </div>
  );
}

export default HorizontalResizePanel;
