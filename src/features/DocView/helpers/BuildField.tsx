import {
  GraphQLArgument,
  GraphQLField,
  GraphQLFieldMap,
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLScalarType,
  GraphQLType,
} from 'graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

export interface GraphQLHandlerType {
  objectField?: GraphQLField<object, object>;
  objectFields?: GraphQLFieldMap<object, object>;
  scalarType?: GraphQLScalarType;
  objectType?: GraphQLInputObjectType;
  descriptions?: Maybe<string>;
}

function ArgsBuilder(
  arg: GraphQLArgument,
  handler: (context: GraphQLHandlerType) => void
): JSX.Element | null {
  const type = arg.type;
  let result: JSX.Element | null = null;

  if (type instanceof GraphQLInputObjectType) {
    const inputType = type;
    result = (
      <span className="arg">
        <span className="arg__name">{arg.name}</span>:{' '}
        <span>
          <span className="arg__type-name">{inputType.name + ' = {}'}</span>
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
            <span
              className="arg__type-name"
              onClick={() => handler({ descriptions: ofType.description })}
            >
              {ofType.name}
            </span>
            !
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

// function getObjectType(item: GraphQLOutputType | GraphQLObjectType) {
//   if (item instanceof GraphQLObjectType) {
//     return item.getFields();
//   } else {
//     return undefined;
//   }
// }

function BuildField(
  content: GraphQLFieldMap<object, object> | undefined,
  handler: (context: GraphQLHandlerType) => void
) {
  if (content === undefined) return;
  const items: JSX.Element[] = [];

  for (const field in content) {
    const item = content[field];

    if (item.type instanceof GraphQLNonNull) {
      const elem = createItemFieldGraphList(item, handler);
      items.push(elem);
    } else {
      const elem = createItemFieldObjectType(item, handler);
      items.push(elem);
    }
  }

  return items;
}

function createItemFieldGraphList(
  item: GraphQLField<object, object>,
  handler: (context: GraphQLHandlerType) => void
) {
  const args = item.args;
  let itemTypeName = '';

  if (item.type instanceof GraphQLNonNull) {
    if (item.type.ofType instanceof GraphQLList) {
      if (item.type.ofType.ofType instanceof GraphQLNonNull) {
        if (item.type.ofType.ofType.ofType instanceof GraphQLObjectType) {
          const obj = item.type.ofType.ofType.ofType;
          itemTypeName = `[${obj.name}]!`;
        }
      }
    }
  }

  // const fields = getObjectType(item.type);
  const elem = (
    <>
      <span className="doc-item__field-name" onClick={() => handler({ objectField: item })}>
        {item.name}
      </span>
      <span>
        {args.map((arg, id) => (
          <div key={id}>({ArgsBuilder(arg, handler)})</div>
        ))}
      </span>
      {`:`}
      <span className="doc-item__type">&nbsp;{itemTypeName}</span>
    </>
  );
  return elem;
}

function createItemFieldObjectType(
  item: GraphQLField<object, object>,
  handler: (context: GraphQLHandlerType) => void
) {
  const args = item.args;
  let itemTypeName = '';
  if (item.type instanceof GraphQLObjectType) {
    itemTypeName = item.type.name;
  }
  const elem = (
    <>
      <span className="doc-item__field-name" onClick={() => handler({ objectField: item })}>
        {item.name}
      </span>
      <span>
        {args.map((arg, id) => (
          <div key={id}>({ArgsBuilder(arg, handler)})</div>
        ))}
      </span>
      {`:`}
      <span className="doc-item__type">&nbsp;{itemTypeName}</span>
    </>
  );
  return elem;
}

export default BuildField;
