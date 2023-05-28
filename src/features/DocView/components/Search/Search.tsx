import { GraphQLSchema } from 'graphql';
import { useState } from 'react';

import style from './search.module.scss';

interface ISearch {
  handler?: (value: string) => void;
  schema?: GraphQLSchema;
}

function Search(props: ISearch) {
  const [value, setValue] = useState('');
  const [snippets, setSnippets] = useState<JSX.Element[]>([]);

  const handlerInput = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value);

    if (event.currentTarget.value.length > 0) {
      if (props.schema === undefined) return;
      const ent = Object.entries(props.schema);

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

export default Search;
