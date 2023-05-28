import React, { useEffect, useRef } from 'react';
import useResizePanel from '../../hooks/useResizePanel';
import Divider from '../Divider/Divider';
import { ILayout } from '../Layout/Layout';
import style from './verticale.module.scss';

interface IVerticalResizePanelProps {
  children?: React.ReactNode;
  ref?: React.RefObject<ILayout>;
}

function VerticalResizePanel(props: IVerticalResizePanelProps) {
  const ownResize = useResizePanel();
  const ownRef = useRef<HTMLDivElement>(null);
  const layoutRefs = useRef(React.Children.map(props.children, () => React.createRef<ILayout>()));

  const divider = <Divider onMouseDown={ownResize.start} align={'Vertical'} />;

  const childrenWithDividers = React.Children.map(props.children, (child, index) => {
    if (!layoutRefs.current) return child;
    return (
      <>
        {React.cloneElement(child as React.ReactElement<IVerticalResizePanelProps>, {
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

      const width1 = layout1.current?.width as number;

      const newWidth = width1 + ownResize.direction.X;

      const layout2 = layoutRefs.current[1];

      const width2 = layout2.current?.width as number;
      const newWidth2 = width2 - ownResize.direction.X;
      const windowWidth = newWidth + newWidth2;

      layout1.current?.handlerChange({ width: (newWidth / windowWidth) * 100 });
      layout2.current?.handlerChange({ width: (newWidth2 / windowWidth) * 100 });
    }
    resize();
  }, [ownResize.direction.X]);

  return (
    <div
      className={style.verticale}
      onMouseMove={ownResize.move}
      onMouseUp={ownResize.end}
      ref={ownRef}
    >
      {childrenWithDividers}
    </div>
  );
}

export default VerticalResizePanel;
