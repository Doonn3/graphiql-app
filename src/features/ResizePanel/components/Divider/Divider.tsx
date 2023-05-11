import { useRef } from 'react';
import style from './divider.module.scss';

type AlignType = 'Vertical' | 'Horizontal';

type refDivider = React.RefObject<HTMLDivElement>;

export interface IDivider {
  ref?: refDivider;
  onMouseDown?: (event: React.MouseEvent) => void;
  align: AlignType;
}

function Divider(props: IDivider) {
  const ownRef = useRef<HTMLDivElement>(null);
  const styleAlign = props.align === 'Horizontal' ? style.horizontal : style.vertical;
  return (
    <div
      className={`${style.divider} ${styleAlign}`}
      ref={ownRef}
      onMouseDown={props.onMouseDown}
    ></div>
  );
}

export default Divider;
