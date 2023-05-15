import { ReactComponent as DocumentationIcon } from '@assets/documentation.svg';
import { useState } from 'react';
import DocView from '../../features/DocView/DocView';

import style from './paneltool.module.scss';

function PanelTool() {
  const [isActiveDoc, setActiveDoc] = useState(false);

  const handlerDocClick = () => {
    setActiveDoc(!isActiveDoc);
  };

  return (
    <div className={`${style.panel} ${isActiveDoc ? style.sliding : ''}`}>
      <div className={style.panel__block}>
        <div className={style.panel__doc}>
          <DocumentationIcon onClick={handlerDocClick} />
        </div>
      </div>

      {isActiveDoc && <DocView />}
    </div>
  );
}

export default PanelTool;
