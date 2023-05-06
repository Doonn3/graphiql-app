import { ReactComponent as DocumentationIcon } from '@assets/documentation.svg';

import style from './paneltool.module.scss';

function PanelTool() {
  return (
    <div className={style.panel}>
      <div className={style.doc}>
        <DocumentationIcon />
      </div>
    </div>
  );
}

export default PanelTool;
