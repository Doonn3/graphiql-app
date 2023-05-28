import { GraphQLSchema } from 'graphql';
import { useEffect, useState } from 'react';
import SchemaDoc from './components/SchemaDoc/SchemaDoc';

import Search from './components/Search/Search';
import style from './doc-view.module.scss';
import './helpers/style/doc.style.scss';

import { getSchema } from './TEST/test';

function DocView() {
  const [doc, setDoc] = useState<JSX.Element>();
  const [schema, setSchema] = useState<GraphQLSchema>();
  // const dispatch = useDispatch();

  const handlerSearch = async (value: string) => {
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
  };

  useEffect(() => {
    async function fields() {
      const schema = await getSchema();
      if (!(schema instanceof GraphQLSchema)) return;
      setSchema(schema);
    }
    fields();
  }, []);

  return (
    <div className={style.doc}>
      <div className={style.doc__header}>
        <h3 className={style.doc__title}>Doc</h3>
        <Search handler={handlerSearch} />
      </div>
      <div className={style.doc__info}>
        {doc}
        {/* <DocGenerator fields={schema} /> */}
        <SchemaDoc schema={schema} />
      </div>
    </div>
  );
}

export default DocView;
