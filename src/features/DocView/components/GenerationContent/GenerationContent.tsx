import { GraphQLFieldMap, GraphQLObjectType } from 'graphql';
import { useContext, useEffect, useState } from 'react';
import { DocViewContext } from '../../DocView';
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
  const { isClick } = useContext(DocViewContext);
  const [propsFields, setPropsFields] = useState<PropsFieldsType>();
  const [propsTypeAndArgs, setPropsTypeAndArgs] = useState<TypeAndArgumentsPropsType>();
  const [descriptions, setDescriptions] = useState('');

  const handlerRootTypes = (fields: GraphQLFieldMap<object, object>) => {
    setPropsTypeAndArgs(undefined);
    setPropsFields({ fields: fields });
  };

  const handlerFields = (context: HandlerAgrument) => {
    if (context.descriptions) {
      setPropsFields(undefined);
      setPropsTypeAndArgs(undefined);
      setDescriptions(context.descriptions);
    }

    if (context.field) {
      const args = context.field.args.slice();
      const type = context.field.type as GraphQLObjectType;
      setPropsFields(undefined);
      setPropsTypeAndArgs({ args, type: type });
    } else {
      setPropsFields({ fields: context.fields });
    }
  };

  useEffect(() => {
    if (isClick || !isClick) {
      setDescriptions('');
      setPropsFields(undefined);
      setPropsTypeAndArgs(undefined);
    }
  }, [isClick]);

  return (
    <div>
      {propsFields === undefined && !propsTypeAndArgs ? (
        <RootTypes graphQLObject={props.typeObjectQuery} handler={handlerRootTypes} />
      ) : propsFields !== undefined ? (
        <Fields fields={propsFields.fields} handlerField={handlerFields} />
      ) : (
        ''
      )}
      {propsTypeAndArgs && <TypeAndArgumentsHelper {...propsTypeAndArgs} />}

      {descriptions && <p>{descriptions}</p>}
    </div>
  );
}

export default GenerationContent;
