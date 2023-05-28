import { GraphQLObjectType } from 'graphql';
import GenerationContent from '../GenerationContent/GenerationContent';

interface TypeDocProps {
  type: GraphQLObjectType;
}

function TypeDoc({ type }: TypeDocProps) {
  return (
    <div>
      <div>
        <GenerationContent typeObjectQuery={type} />
      </div>
    </div>
  );
}

export default TypeDoc;
