import {
  GraphQLArgument,
  GraphQLField,
  GraphQLFieldMap,
  GraphQLNonNull,
  GraphQLObjectType,
} from 'graphql';
import { Maybe } from 'graphql/jsutils/Maybe';
import { ObjMap } from 'graphql/jsutils/ObjMap';
import React, { useState } from 'react';
import FetchApi from '../../shared/FetchApi/FetchApi';
import style from './doc-view.module.scss';

interface IArgsType {
  name: string;
  description: string;
}

interface INodeArgs {
  name: string;
  description: string;
  type: IArgsType;
}

interface INodeFields {
  name: string;
  args: [];
  description: string;
  type: IArgsType;
}

interface IDocNode<T, S, A> {
  name: string;
  args: INodeArgs[];
  type: INodeFields;
}

class DocNode {
  // private root: GraphQLFieldMap<object, object>;

  private node: GraphQLField<object, object>;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(node: GraphQLField<object, object>) {
    this.node = node;
    console.log(node, '<<<NODE');
  }
}

type DocInfoType = { [key: string]: string };

function parseDocs(schemaQueryType: Maybe<GraphQLObjectType>) {
  // console.log(schemaQueryType, 'QUERY');
  // console.log(schemaQueryType?.getFields(), 'FIELDS');
  const content = schemaQueryType?.getFields();
  if (content === undefined) return;
  const f = content.continent;

  const docNode = new DocNode(f);
  // let docInfo: DocInfoType = null;
  // if (schemaQueryType?.name)
}

async function test() {
  const testGetSchema = await FetchApi.instance.RequestIntrospection();

  const queryType = testGetSchema?.getQueryType();
  parseDocs(queryType);
  // console.log(queryType, 'QUERY');
  // console.log(queryType?.getFields(), 'FIELDS');
  return testGetSchema?.getTypeMap();
}

test();

interface ISearch {
  handler?: (value: string) => void;
}

function Search(props: ISearch) {
  const [value, setValue] = useState('');
  const [snippets, setSnippets] = useState<JSX.Element[]>([]);

  const handlerInput = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value);

    if (event.currentTarget.value.length > 0) {
      const tt = await test();
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

  const handlerSearch = async (value: string) => {
    const tt = await test();
    if (tt === undefined) return;
    const ent = Object.entries(tt);
    const find = ent.find((elem) => elem[0] === value);
    if (!find) return;
    const div = <div>{find[1].description}</div>;
    setDoc(div);
  };

  return (
    <div className={style.doc}>
      <div className={style.doc__header}>
        <h3 className={style.doc__title}>Doc</h3>
        <Search handler={handlerSearch} />
      </div>
      <div className={style.doc__info}>
        {doc}
        <b>Test</b>
        <b>Test</b>
        <b>Test</b>
        <b>Test</b>
        <b>Test</b>
        <b>Test</b>
        <b>Test</b>
      </div>
    </div>
  );
}

export default DocView;
