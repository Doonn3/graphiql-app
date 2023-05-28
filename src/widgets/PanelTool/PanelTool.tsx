import { ReactComponent as DocumentationIcon } from '@assets/documentation.svg';
import { useEffect, useState } from 'react';
import DocView from '@features/DocView/DocView';

import style from './paneltool.module.scss';
import { GraphQLSchema } from 'graphql';
import FetchApi from '../../shared/FetchApi/FetchApi';

function PanelTool() {
  const [isActiveDoc, setActiveDoc] = useState(false);
  const [schema, setSchema] = useState<GraphQLSchema | undefined>();

  const handlerDocClick = () => {
    setActiveDoc(!isActiveDoc);
  };

  useEffect(() => {
    async function getSchema() {
      const schema = await FetchApi.instance.RequestIntrospection();
      if (schema instanceof GraphQLSchema) {
        setSchema(schema);
      }
    }
    getSchema();
  }, []);

  return (
    <div className={`${style.panel} ${isActiveDoc ? style.sliding : ''}`}>
      <div className={style.panel__block}>
        <div className={style.panel__doc}>
          <DocumentationIcon onClick={handlerDocClick} />
        </div>
      </div>

      {isActiveDoc && <DocView schema={schema} />}
    </div>
  );
}

export default PanelTool;
