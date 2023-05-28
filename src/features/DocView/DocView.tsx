import { GraphQLField, GraphQLFieldMap, GraphQLSchema } from 'graphql';
import { useEffect, useState } from 'react';
import SchemaDoc from './components/DocGenerator/components/SchemaDoc/SchemaDoc';
import DocGenerator from './components/DocGenerator/DocGenerator';
import Search from './components/Search/Search';
import style from './doc-view.module.scss';
import { useDispatch } from 'react-redux';
import { changeShowModal, setErrorValue } from '@shared/store/textEditorSlice';
import { getFields, getSchema } from './TEST/test';

async function test() {
  const testGetSchema = await FetchApi.instance.RequestIntrospection();
  if (testGetSchema instanceof Error) {
    return testGetSchema;
  }
  const queryType = testGetSchema?.getQueryType();

  return testGetSchema?.getTypeMap();
}

test();

interface ISearch {
  handler?: (value: string) => void;
}

function Search(props: ISearch) {
  const [value, setValue] = useState('');
  const [snippets, setSnippets] = useState<JSX.Element[]>([]);
  const dispatch = useDispatch();

  const handlerInput = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value);

    if (event.currentTarget.value.length > 0) {
      const tt = await test();
      if (tt instanceof Error) {
        dispatch(setErrorValue(tt.message));
        dispatch(changeShowModal(true));
      }

      if (tt === undefined) return;
      const ent = Object.entries(tt);

      const searchElem = ent.filter((elem) =>
        elem[0].toLocaleLowerCase().includes(value.toLocaleLowerCase())
      );

      let resultSearch: JSX.Element[] = [];

      const elems = searchElem.map((elem, id) => {
        return (
          <li key={id} onClick={handlerType}>
            {elem[0]}
          </li>
        );
      });
      resultSearch = elems;

      if (resultSearch.length <= 0) {
        const notFound = [<li key={0}>Not Found</li>];
        resultSearch = notFound;
      }

      setSnippets(resultSearch);
    }
  };

  const handlerType = (event: React.MouseEvent<HTMLLIElement>) => {
    setValue('');
    if (event.currentTarget.textContent === null) return;
    if (props.handler) props.handler(event.currentTarget.textContent);
  };

  return (
    <div className={style.search}>
      <input className={style.search__input} type="text" value={value} onInput={handlerInput} />
      <div
        className={`${style.search__snippets} ${
          value.length <= 0 ? style.search__snippets_hidden : ''
        }`}
      >
        <ul>{value.length <= 0 ? '' : snippets}</ul>
      </div>
    </div>
  );
}

function DocView() {
  const [doc, setDoc] = useState<JSX.Element>();
  const dispatch = useDispatch();

  const handlerSearch = async (value: string) => {
    const tt = await test();
    if (tt instanceof Error) {
      dispatch(setErrorValue(tt.message));
      dispatch(changeShowModal(true));
    }

    if (tt === undefined) return;
    const ent = Object.entries(tt);
    const find = ent.find((elem) => elem[0] === value);
    if (!find) return;
    const div = <div>{find[1].description}</div>;
    setDoc(div);
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
