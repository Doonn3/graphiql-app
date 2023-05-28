import { GraphQLSchema } from 'graphql';
import React, { useState } from 'react';
import SchemaDoc from './components/SchemaDoc/SchemaDoc';

import style from './doc-view.module.scss';
import './helpers/style/doc.style.scss';

interface ContextType {
  isClick: boolean;
  handlerClick?: () => void;
}

export const DocViewContext = React.createContext<ContextType>({ isClick: false });

interface PropsDocViewType {
  schema?: GraphQLSchema;
}

function DocView(props: PropsDocViewType) {
  const [isClickBack, setClickBack] = useState(false);

  const handlerBackDocClick = () => {
    setClickBack(!isClickBack);
  };

  return (
    <DocViewContext.Provider value={{ isClick: isClickBack }}>
      <div className={style.doc}>
        <div className={style.doc__header}>
          <h3 className={style.doc__title}>Doc</h3>
          <span className={style.doc__back} onClick={handlerBackDocClick}>
            B
          </span>
          {/* <Search handler={handlerSearch} /> */}
        </div>
        <div className={style.doc__info}>
          <SchemaDoc schema={props.schema} />
        </div>
      </div>
    </DocViewContext.Provider>
  );
}

export default DocView;
