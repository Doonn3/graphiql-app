import { GraphQLField, GraphQLFieldMap, GraphQLSchema } from 'graphql';
import { useEffect, useState } from 'react';
import SchemaDoc from './components/DocGenerator/components/SchemaDoc/SchemaDoc';
import DocGenerator from './components/DocGenerator/DocGenerator';
import Search from './components/Search/Search';
import style from './doc-view.module.scss';
import { getFields, getSchema } from './TEST/test';

function DocView() {
  const [doc, setDoc] = useState<JSX.Element>();
  const [schema, setSchema] = useState<GraphQLFieldMap<object, object>>();
  const [sch, setSchemaDoc] = useState<GraphQLSchema>();

  const handlerSearch = async (value: string) => {
    // const tt = await test();
    // if (tt === undefined) return;
    // const ent = Object.entries(tt);
    // const find = ent.find((elem) => elem[0] === value);
    // if (!find) return;
    // const div = <div>{find[1].description}</div>;
    // setDoc(div);
  };

  useEffect(() => {
    async function fields() {
      const test = await getFields();
      if (test === undefined) return;
      // console.log(test.continent);
      setSchema(test);

      const schema = await getSchema();
      if (schema === null) return;
      setSchemaDoc(schema);
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
        <SchemaDoc schema={sch} />
      </div>
    </div>
  );
}

export default DocView;
