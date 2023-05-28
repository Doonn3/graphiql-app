import {
  GraphQLArgument,
  GraphQLField,
  GraphQLFieldMap,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLScalarType,
  GraphQLType,
} from 'graphql';
import { useCallback } from 'react';

interface GraphQLHandlerType {
  objectField?: GraphQLField<object, object>;
  scalarType?: GraphQLScalarType;
  objectType?: GraphQLInputObjectType;
}

function ArgsBuilder(arg: GraphQLArgument): JSX.Element | null {
  const type = arg.type;
  let result: JSX.Element | null = null;

  if (type instanceof GraphQLInputObjectType) {
    const inputType = type;
    result = (
      <span className="arg">
        <span className="arg__name">{arg.name}</span>:{' '}
        <span>
          <span className="arg__type-name">{inputType.name}</span>!
        </span>
      </span>
    );
  } else if (type instanceof GraphQLNonNull) {
    const nonNullType = type as GraphQLNonNull<GraphQLType>;
    const ofType = nonNullType.ofType;

    if (ofType instanceof GraphQLScalarType) {
      result = (
        <span className="arg">
          <span className="arg__name">{arg.name}</span>:{' '}
          <span>
            <span className="arg__type-name">{ofType.name}</span>!
          </span>
        </span>
      );
    }
  } else if (type instanceof GraphQLScalarType) {
    const scalarType = type as GraphQLScalarType;
    result = (
      <span className="arg">
        <span className="arg__name">{arg.name}</span>:{' '}
        <span>
          <span className="arg__type-name">{scalarType.name}</span>!
        </span>
      </span>
    );
  }

  return result;
}

function itemsBuilder(
  content: GraphQLFieldMap<object, object>,
  handler: (context: GraphQLHandlerType) => void
) {
  const items: JSX.Element[] = [];

  for (const field in content) {
    const item = content[field];
    const args = item.args;
    const type = item.type as GraphQLObjectType;

    const elem = (
      <>
        <span className="doc-item__field-name" onClick={() => handler({ objectField: item })}>
          {item.name}
        </span>
        <span>
          {args.map((arg, id) => (
            <div key={id}>({ArgsBuilder(arg)})</div>
          ))}
        </span>
        {`:`}
        <span className="doc-item__type">&nbsp;{type.name}</span>
      </>
    );
    items.push(elem);
    // break;
  }

  return items;
}

export interface PropsFieldsType {
  fields?: GraphQLFieldMap<object, object>;
  handlerField?: (context: GraphQLField<object, object>) => void;
}

function Fields(props: PropsFieldsType) {
  function renderFields() {
    if (!props.fields) return null;
    const items = itemsBuilder(props.fields, handleField);
    return (
      <div>
        {/* <h3>Fields</h3> */}
        {items.map((item, id) => (
          <div className="doc-item" key={id}>
            {item}
          </div>
        ))}
      </div>
    );
  }

  const handleField = useCallback(
    (context: GraphQLHandlerType) => {
      if (context.objectField) {
        if (props.handlerField) props.handlerField(context.objectField);
      }
    },
    [props]
  );

  return (
    <div>
      <h3>Fields</h3>
      <div>{renderFields()}</div>
    </div>
  );
}

export default Fields;
