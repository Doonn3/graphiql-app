import {
  GraphQLArgument,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLScalarType,
  GraphQLType,
} from 'graphql';
import './arg-builder.scss';

function ArgsBuilder(arg: GraphQLArgument): JSX.Element | null {
  const type = arg.type;
  let result: JSX.Element | null = null;

  if (type instanceof GraphQLInputObjectType) {
    const inputType = type as GraphQLInputObjectType;
    result = (
      <span className="arg">
        <span className="arg__name">{arg.name}</span>:{' '}
        <span>
          <a className="arg__type-name" href="">
            {inputType.name}
          </a>
          !
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
            <a className="arg__type-name" href="">
              {ofType.name}
            </a>
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
          <a className="arg__type-name" href="">
            {scalarType.name}
          </a>
          !
        </span>
      </span>
    );
  }

  return result;
}

export default ArgsBuilder;
