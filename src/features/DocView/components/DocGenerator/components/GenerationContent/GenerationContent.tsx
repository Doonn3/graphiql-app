import {
  GraphQLArgument,
  GraphQLField,
  GraphQLFieldMap,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLScalarType,
  GraphQLType,
} from 'graphql';
import { useCallback, useEffect, useState } from 'react';
import './generation-content.scss';

interface GraphQLHandlerType {
  root?: GraphQLField<object, object>;
  scalarType?: GraphQLScalarType;
  objectType?: GraphQLInputObjectType;
}

function ArgsBuilder(
  arg: GraphQLArgument,
  handler: (context: GraphQLHandlerType) => void
): JSX.Element | null {
  const type = arg.type;
  let result: JSX.Element | null = null;

  if (type instanceof GraphQLInputObjectType) {
    const inputType = type;
    result = (
      <span className="arg">
        <span className="arg__name">{arg.name}</span>:{' '}
        <span>
          <span className="arg__type-name" onClick={() => handler({ objectType: inputType })}>
            {inputType.name}
          </span>
          !
        </span>
      </span>
    );
  } else if (type instanceof GraphQLNonNull) {
    const nonNullType = type as GraphQLNonNull<GraphQLType>;
    const ofType = nonNullType.ofType;
    console.log(ofType);

    if (ofType instanceof GraphQLScalarType) {
      result = (
        <span className="arg">
          <span className="arg__name">{arg.name}</span>:{' '}
          <span>
            <span className="arg__type-name" onClick={() => handler({ scalarType: ofType })}>
              {ofType.name}
            </span>
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
          <span className="arg__type-name">{scalarType.name}</span>!
        </span>
      </span>
    );
  }

  return result;
}

function itemsBuilder(
  content: GraphQLFieldMap<object, object>,
  handler: (context: GraphQLHandlerType) => void
) {
  const items: JSX.Element[] = [];

  for (const field in content) {
    const item = content[field];
    const args = item.args;
    const type = item.type as GraphQLObjectType;

    const elem = (
      <>
        <span className="doc-item__field-name" onClick={() => handler({ root: item })}>
          {item.name}
        </span>
        <span>
          {args.map((arg, id) => (
            <div key={id}>({ArgsBuilder(arg, handler)})</div>
          ))}
        </span>
        {`:`}
        <span className="doc-item__type">&nbsp;{type.name}</span>
      </>
    );
    items.push(elem);
    // break;
  }

  return items;
}

export interface GenContentType {
  type?: GraphQLObjectType;
  fields?: GraphQLFieldMap<object, object>;
}

function GenerationContent(props: GenContentType) {
  const [test, setTest] = useState<JSX.Element | null>(null);

  const handleClick = useCallback((context: GraphQLHandlerType) => {
    let template: JSX.Element | null = null;

    if (context.root) {
      console.log('ROOT', context.root);
    }

    if (context.objectType) {
      const type = context.objectType;
      const fields = type.getFields();
      template = <div>LOLOLO</div>;
      console.log('FIELDS', fields);
    }

    if (context.scalarType) {
      template = <p>{context.scalarType.description}</p>;
    }

    setTest(template);
  }, []);

  //   useEffect(() => {
  // console.log('QQQQQQQQQQQQQQQ');
  function renderContent() {
    if (!props.fields || !props.type) return null;
    const items = itemsBuilder(props.fields, handleClick);
    return (
      <div>
        <h3>Fields</h3>
        {items.map((item, id) => (
          <div className="doc-item" key={id}>
            {item}
          </div>
        ))}
      </div>
    );
  }
  //   setTest(renderContent());
  //   }, [props.fields, props.type]);

  return test === null ? renderContent() : test;
}

export default GenerationContent;
