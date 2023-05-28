import { GraphQLFieldMap, GraphQLObjectType } from 'graphql';

interface RootPropsType {
  graphQLObject?: GraphQLObjectType;
  handler?: (context: GraphQLFieldMap<object, object>) => void;
}

function RootTypes(props: RootPropsType) {
  const handlerClick = (context: GraphQLObjectType | undefined) => {
    if (!context) return;
    if (props.handler) {
      props.handler(context.getFields());
    }
  };

  return (
    <div>
      <h3>Root Types</h3>
      <div>
        <span>query:</span>
        <span onClick={() => handlerClick(props.graphQLObject)}>{props.graphQLObject?.name}</span>
      </div>
    </div>
  );
}

export default RootTypes;
