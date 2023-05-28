import { GraphQLField, GraphQLFieldMap } from 'graphql';
import { useCallback } from 'react';
import BuildField, { GraphQLHandlerType } from './BuildField';

export interface HandlerAgrument {
  field?: GraphQLField<object, object>;
  fields?: GraphQLFieldMap<object, object>;
  descriptions?: string;
}

export interface PropsFieldsType {
  fields?: GraphQLFieldMap<object, object>;
  handlerField?: (context: HandlerAgrument) => void;
}

function Fields(props: PropsFieldsType) {
  function renderFields() {
    if (!props.fields) return null;
    const fields = BuildField(props.fields, handlerClickArgsAndType);
    if (fields === undefined) return;

    return (
      <div>
        <h3>Fields</h3>
        {fields.map((item, id) => (
          <div className="doc-item" key={id}>
            {item}
          </div>
        ))}
      </div>
    );
  }

  const handlerClickArgsAndType = useCallback(
    (context: GraphQLHandlerType) => {
      if (context.descriptions) {
        if (props.handlerField) props.handlerField({ descriptions: context.descriptions });
      }

      if (context.objectField) {
        if (props.handlerField) props.handlerField({ field: context.objectField });
      }

      if (context.objectFields) {
        if (props.handlerField) {
          if (context.objectFields) props.handlerField({ fields: context.objectFields });
        }
      }
    },
    [props]
  );

  return (
    <div>
      <h3 className="doc-explorer__title">Fields</h3>
      <div>{renderFields()}</div>
    </div>
  );
}

export default Fields;
