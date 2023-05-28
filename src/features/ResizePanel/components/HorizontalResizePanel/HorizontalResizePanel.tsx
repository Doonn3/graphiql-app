import React, { useEffect, useRef } from 'react';
import useResizePanel from '../../hooks/useResizePanel';
import Divider from '../Divider/Divider';
import { ILayout } from '../Layout/Layout';
import style from './horizontalLayout.module.scss';

interface ILayerProps {
  children?: React.ReactNode;
  ref?: React.RefObject<ILayout>;
}

function HorizontalResizePanel(props: ILayerProps) {
  const ownResize = useResizePanel();
  const ownRef = useRef<HTMLDivElement>(null);
  const layoutRefs = useRef(React.Children.map(props.children, () => React.createRef<ILayout>()));

  const divider = <Divider onMouseDown={ownResize.start} align={'Horizontal'} />;

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

  useEffect(() => {
    function resize() {
      if (!layoutRefs.current) return;
      const layout1 = layoutRefs.current[0];
      const height1 = layout1.current?.height as number;
      const newHeight = height1 + ownResize.direction.Y;
      const layout2 = layoutRefs.current[1];
      const height2 = layout2.current?.height as number;
      const newHeight2 = height2 - ownResize.direction.Y;
      const windowHeight = newHeight + newHeight2;
      layout1.current?.handlerChange({ height: (newHeight / windowHeight) * 100 });
      layout2.current?.handlerChange({ height: (newHeight2 / windowHeight) * 100 });
    }
    resize();
  }, [ownResize.direction.Y]);

  return (
    <div
      className={style.horizontal}
      onMouseMove={ownResize.move}
      onMouseUp={ownResize.end}
      ref={ownRef}
    >
      {childrenWithDividers}
    </div>
  );
}

export default HorizontalResizePanel;
