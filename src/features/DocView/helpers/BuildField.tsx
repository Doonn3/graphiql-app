import {
  GraphQLArgument,
  GraphQLField,
  GraphQLFieldMap,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLOutputType,
  GraphQLScalarType,
  GraphQLType,
} from 'graphql';

export interface GraphQLHandlerType {
  objectField?: GraphQLField<object, object>;
  objectFields?: GraphQLFieldMap<object, object>;
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
function getObjectType(item: GraphQLOutputType | GraphQLObjectType) {
  if (item instanceof GraphQLObjectType) {
    return item.getFields();
  } else {
    return undefined;
  }
}

function BuildField(
  content: GraphQLFieldMap<object, object> | undefined,
  handler: (context: GraphQLHandlerType) => void
) {
  if (content === undefined) return;
  const items: JSX.Element[] = [];

  for (const field in content) {
    const item = content[field];
    const args = item.args;
    const itemTypeName = (item.type as GraphQLObjectType).name;
    // let itemTypeName = '';

    // if (item.type instanceof GraphQLNonNull) {
    //   if (item.type.ofType instanceof GraphQLScalarType) {
    //     itemTypeName = `${item.type.ofType.name}!`;
    //   }
    //   console.log(item.type.ofType, 'ITEM');
    // }

    const fields = getObjectType(item.type);

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
        <span className="doc-item__type" onClick={() => handler({ objectFields: fields })}>
          &nbsp;{itemTypeName}
        </span>
      </>
    );
    items.push(elem);
    // break;
  }

  return items;
}

export default BuildField;
