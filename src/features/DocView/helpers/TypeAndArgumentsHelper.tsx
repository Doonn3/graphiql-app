import {
  GraphQLArgs,
  GraphQLArgument,
  GraphQLField,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLOutputType,
  GraphQLScalarType,
} from 'graphql';
import { type } from 'os';

export interface TypeAndArgumentsPropsType {
  type: GraphQLObjectType | GraphQLScalarType;
  args: GraphQLArgument[];
}

function TypeAndArgumentsHelper(props: TypeAndArgumentsPropsType) {
  let name = '';
  if (props.type instanceof GraphQLNonNull) {
    // console.log(props.type.ofType.ofType.ofType.name);
    name = `[${props.type.ofType.ofType.ofType.name}]!`;
  }
  return (
    <div>
      <div className="doc-explorer__content">
        <h3 className="doc-explorer__title">Type</h3>
        <div className="doc-explorer__type-name">
          {props.type instanceof GraphQLNonNull ? name : props.type.name}
        </div>
      </div>
      <div className="doc-explorer__content">
        <h3 className="doc-explorer__title">Arguments</h3>
        <div>
          {props.args.map((item, id) => {
            const type = item.type;
            let elem: JSX.Element;
            if (type instanceof GraphQLInputObjectType) {
              elem = (
                <>
                  <span className="doc-explorer__type-name">{type.name}</span>
                  <span> = </span>
                  <span>{`{}`}</span>
                </>
              );
            } else {
              elem = <></>;
            }

            if (type instanceof GraphQLNonNull) {
              const scalarType = type.ofType as GraphQLScalarType;
              elem = <span className="doc-explorer__type-name">{scalarType.name}!</span>;
            }

            return (
              <div key={id}>
                <span className="doc-explorer__arg-name">{item.name}</span>
                <span>: </span>
                {elem}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default TypeAndArgumentsHelper;
