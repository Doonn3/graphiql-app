import { GraphQLFieldMap, GraphQLObjectType } from 'graphql';
import { useState } from 'react';
import Fields, { HandlerAgrument, PropsFieldsType } from '../../helpers/Fields';
import RootTypes from '../../helpers/RootTypes';
import TypeAndArgumentsHelper, {
  TypeAndArgumentsPropsType,
} from '../../helpers/TypeAndArgumentsHelper';

export interface GenContentType {
  typeObjectQuery?: GraphQLObjectType;
  fields?: GraphQLFieldMap<object, object>;
}

function GenerationContent(props: GenContentType) {
  const [propsFields, setPropsFields] = useState<PropsFieldsType>();
  const [propsTypeAndArgs, setPropsTypeAndArgs] = useState<TypeAndArgumentsPropsType>();

  const handlerRootTypes = (fields: GraphQLFieldMap<object, object>) => {
    setPropsTypeAndArgs(undefined);
    setPropsFields({ fields: fields });
  };

  const handlerFields = (context: HandlerAgrument) => {
    // if (context.field?.type instanceof GraphQLNonNull) {
    //   const field = context.field.type.ofType;
    //   if (field instanceof GraphQLScalarType) {
    //     const result = field;
    //     console.log(result);
    //     // setPropsFields({ fields: result });
    //   }
    // } else
    if (context.field) {
      const args = context.field.args.slice();
      const type = context.field.type as GraphQLObjectType;
      setPropsFields(undefined);
      setPropsTypeAndArgs({ args, type: type });
    } else {
      setPropsFields({ fields: context.fields });
    }
  };

  return (
    <div>
      {propsFields === undefined ? (
        <RootTypes graphQLObject={props.typeObjectQuery} handler={handlerRootTypes} />
      ) : (
        ''
      )}

      {propsFields && <Fields fields={propsFields.fields} handlerField={handlerFields} />}

      {propsTypeAndArgs && <TypeAndArgumentsHelper {...propsTypeAndArgs} />}
    </div>
  );
}

export default GenerationContent;
