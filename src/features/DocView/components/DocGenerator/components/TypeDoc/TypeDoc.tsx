import { GraphQLFieldMap, GraphQLObjectType } from 'graphql';
import { useState } from 'react';
import GenerationContent, { GenContentType } from '../GenerationContent/GenerationContent';

interface TypeDocProps {
  type: GraphQLObjectType;
}

function TypeDoc({ type }: TypeDocProps) {
  const fields = type.getFields();
  const [genContent, setGenContent] = useState<GenContentType>();

  const handlerClick = (type: GraphQLObjectType) => {
    console.log(type.getFields());
    setGenContent({
      type: type,
      fields: type.getFields(),
    });
  };

  return (
    <div>
      <span>Root Types</span>
      <div>
        <span>query:</span>
        <span onClick={() => handlerClick(type)}>{type.name}</span>
        <GenerationContent {...genContent} />
      </div>
    </div>
  );
}

export default TypeDoc;
