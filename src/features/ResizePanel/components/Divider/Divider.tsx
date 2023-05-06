import { useRef } from 'react';
import style from './divider.module.scss';

type refDivider = React.RefObject<HTMLDivElement>;

export interface IDivider {
  ref?: refDivider;
  onMouseDown?: (event: React.MouseEvent) => void;
}

function Divider(props: IDivider) {
  const ownRef = useRef<HTMLDivElement>(null);
  return <div className={style.divider} ref={ownRef} onMouseDown={props.onMouseDown}></div>;
}

export default Divider;
