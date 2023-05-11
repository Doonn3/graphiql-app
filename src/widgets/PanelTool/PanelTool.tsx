import { ReactComponent as DocumentationIcon } from '@assets/documentation.svg';
import { useState } from 'react';

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

      {isActiveDoc && (
        <div className={style.doc}>
          <div className={style.doc__header}>
            <h3 className={style.doc__title}>Doc</h3>
            <input className={style.doc__search} type="text" />
          </div>
          <div className={style.doc__info}>
            <b>Test</b>
            <b>Test</b>
            <b>Test</b>
            <b>Test</b>
            <b>Test</b>
            <b>Test</b>
            <b>Test</b>
          </div>
        </div>
      )}
    </div>
  );
}

export default PanelTool;
