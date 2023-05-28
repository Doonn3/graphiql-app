import { GraphQLSchema } from 'graphql';
import React, { useState } from 'react';
import SchemaDoc from './components/SchemaDoc/SchemaDoc';

// import Search from './components/Search/Search';
import style from './doc-view.module.scss';
import './helpers/style/doc.style.scss';

// import { getSchema } from './TEST/test';
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
  // const [schema, setSchema] = useState<GraphQLSchema | undefined>(props.schema);
  // const dispatch = useDispatch();

  // const handlerSearch = async (value: string) => {
  // const tt = await test();
  // if (tt instanceof Error) {
  // dispatch(setErrorValue(tt.message));
  // dispatch(changeShowModal(true));
  // }
  // if (tt === undefined) return;
  // const ent = Object.entries(tt);
  // const find = ent.find((elem) => elem[0] === value);
  // if (!find) return;
  // const div = <div>{find[1].description}</div>;
  // setDoc(div);
  // };

  // useEffect(() => {
  //   async function fields() {
  //     const schema = await getSchema();
  //     if (!(schema instanceof GraphQLSchema)) return;
  //     setSchema(schema);
  //   }
  //   fields();
  // }, []);

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
