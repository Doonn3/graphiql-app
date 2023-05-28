import { GraphQLObjectType } from 'graphql';
import GenerationContent from '../GenerationContent/GenerationContent';

interface TypeDocProps {
  type: GraphQLObjectType;
}

function TypeDoc({ type }: TypeDocProps) {
  // const fields = type.getFields();
  // const [genContent, setGenContent] = useState<GenContentType>();

  // const handlerClick = (type: GraphQLObjectType) => {
  //   setGenContent({
  //     typeObjectQuery: type,
  //     fields: type.getFields(),
  //   });
  // };

  return (
    <div>
      {/* <span>Root Types</span> */}
      <div>
        {/* <span>query:</span> */}
        {/* <span onClick={() => handlerClick(type)}>{type.name}</span> */}
        <GenerationContent typeObjectQuery={type} />
      </div>
    </div>
  );
}

export default TypeDoc;
