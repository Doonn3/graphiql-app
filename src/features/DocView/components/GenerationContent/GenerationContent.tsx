import {
  GraphQLArgument,
  GraphQLField,
  GraphQLFieldMap,
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLScalarType,
  GraphQLType,
} from 'graphql';
import { useCallback, useEffect, useState } from 'react';
import Fields, { PropsFieldsType } from '../../helpers/Fields';
import RootTypes from '../../helpers/RootTypes';
import TypeAndArgumentsHelper, {
  TypeAndArgumentsPropsType,
} from '../../helpers/TypeAndArgumentsHelper';
import './generation-content.scss';

// interface GraphQLHandlerType {
//   fieldObject?: GraphQLField<object, object>;
//   scalarType?: GraphQLScalarType;
//   objectType?: GraphQLInputObjectType;
// }

// function ArgsBuilder(
//   arg: GraphQLArgument,
//   handler: (context: GraphQLHandlerType) => void
// ): JSX.Element | null {
//   const type = arg.type;
//   let result: JSX.Element | null = null;

//   if (type instanceof GraphQLInputObjectType) {
//     const inputType = type;
//     result = (
//       <span className="arg">
//         <span className="arg__name">{arg.name}</span>:{' '}
//         <span>
//           <span className="arg__type-name" onClick={() => handler({ objectType: inputType })}>
//             {inputType.name}
//           </span>
//           !
//         </span>
//       </span>
//     );
//   } else if (type instanceof GraphQLNonNull) {
//     const nonNullType = type as GraphQLNonNull<GraphQLType>;
//     const ofType = nonNullType.ofType;

//     if (ofType instanceof GraphQLScalarType) {
//       result = (
//         <span className="arg">
//           <span className="arg__name">{arg.name}</span>:{' '}
//           <span>
//             <span className="arg__type-name" onClick={() => handler({ scalarType: ofType })}>
//               {ofType.name}
//             </span>
//             !
//           </span>
//         </span>
//       );
//     }
//   } else if (type instanceof GraphQLScalarType) {
//     const scalarType = type as GraphQLScalarType;
//     result = (
//       <span className="arg">
//         <span className="arg__name">{arg.name}</span>:{' '}
//         <span>
//           <span className="arg__type-name">{scalarType.name}</span>!
//         </span>
//       </span>
//     );
//   }

//   return result;
// }

// function itemsBuilder(
//   content: GraphQLFieldMap<object, object>,
//   handler: (context: GraphQLHandlerType) => void
// ) {
//   const items: JSX.Element[] = [];

//   for (const field in content) {
//     const item = content[field];
//     const args = item.args;
//     const type = item.type as GraphQLObjectType;

//     const elem = (
//       <>
//         <span className="doc-item__field-name" onClick={() => handler({ fieldObject: item })}>
//           {item.name}
//         </span>
//         <span>
//           {args.map((arg, id) => (
//             <div key={id}>({ArgsBuilder(arg, handler)})</div>
//           ))}
//         </span>
//         {`:`}
//         <span className="doc-item__type">&nbsp;{type.name}</span>
//       </>
//     );
//     items.push(elem);
//     // break;
//   }

//   return items;
// }

export interface GenContentType {
  typeObjectQuery?: GraphQLObjectType;
  fields?: GraphQLFieldMap<object, object>;
}

function GenerationContent(props: GenContentType) {
  const [test, setTest] = useState<JSX.Element | null>(null);
  const [typeAndArguments, setTypeAndArgument] = useState<TypeAndArgumentsPropsType>();

  // const handleClick = useCallback((context: GraphQLHandlerType) => {
  //   // let template: JSX.Element | null = null;

  //   if (context.fieldObject) {
  //     const args: GraphQLArgument[] = context.fieldObject.args.slice();
  //     setTypeAndArgument({ type: context.fieldObject, args: args });
  //   }

  // if (context.objectType) {
  //   const type = context.objectType;
  //   const fields = type.getFields();
  //   template = <div>LOLOLO</div>;
  // }

  // if (context.scalarType) {
  //   template = <p>{context.scalarType.description}</p>;
  // }

  // setTest(template);
  // }, []);

  //   useEffect(() => {

  // function renderContent() {
  //   if (!props.fields || !props.typeObjectQuery) return null;
  //   const items = itemsBuilder(props.fields, handleClick);
  //   return (
  //     <div>
  //       <h3>Fields</h3>
  //       {items.map((item, id) => (
  //         <div className="doc-item" key={id}>
  //           {item}
  //         </div>
  //       ))}
  //     </div>
  //   );
  // }
  //   setTest(renderContent());
  //   }, [props.fields, props.type]);

  // return test === null ? (
  //   renderContent()
  // ) : test ? (
  //   typeAndArguments !== undefined ? (
  //     <TypeAndArgumentsHelper {...typeAndArguments} />
  //   ) : (
  //     ''
  //   )
  // ) : (
  //   ''
  // );

  const [propsFields, setPropsFields] = useState<PropsFieldsType>();
  const [propsTypeAndArgs, setPropsTypeAndArgs] = useState<TypeAndArgumentsPropsType>();

  const handlerRootTypes = (fields: GraphQLFieldMap<object, object>) => {
    setPropsFields({ fields: fields });
  };

  const handlerFields = (context: GraphQLField<object, object>) => {
    const args = context.args.slice();
    const type = context.type as GraphQLObjectType;

    console.log(context);
    // if (type instanceof GraphQLNonNull) {
    //   console.log(type.ofType.ofType.ofType);
    // }

    // const type = context.type as GraphQLObjectType;

    // console.log(type.getFields());

    setPropsFields(undefined);
    setPropsTypeAndArgs({ args, type: type });
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
