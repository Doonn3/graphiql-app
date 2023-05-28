import {
  GraphQLArgs,
  GraphQLArgument,
  GraphQLField,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLScalarType,
} from 'graphql';
import { type } from 'os';

export interface TypeAndArgumentsPropsType {
  type: GraphQLObjectType | GraphQLScalarType;
  args: GraphQLArgument[];
}

function TypeAndArgumentsHelper(props: TypeAndArgumentsPropsType) {
  console.log(props.args);
  return (
    <div>
      <div>
        <h3>Type</h3>
        <div>{props.type.name}</div>
      </div>
      <div>
        <h3>Arguments</h3>
        <div>
          {props.args.map((item, id) => {
            const type = item.type;
            let elem: JSX.Element;
            if (type instanceof GraphQLInputObjectType) {
              elem = (
                <>
                  <span>{type.name}</span>
                  <span> = </span>
                  <span>{`{}`}</span>
                </>
              );
            } else {
              elem = <></>;
            }

            if (type instanceof GraphQLNonNull) {
              const scalarType = type.ofType as GraphQLScalarType;
              elem = <span>{scalarType.name}!</span>;
            }

            return (
              <div key={id}>
                <span>{item.name}</span>
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
