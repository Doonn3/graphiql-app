import { GraphQLArgument, GraphQLField, GraphQLFieldMap } from 'graphql';
import ArgsBuilder from './components/ArgsBuilder/ArgsBuilder';
import SchemaDoc from './components/SchemaDoc/SchemaDoc';
import './doc-generator.scss';

interface SchemaFieldsType {
  fields: GraphQLFieldMap<object, object> | undefined;
}

function DocGenerator(props: SchemaFieldsType) {
  function builderItem(field: GraphQLField<object, object>) {
    if (Array.isArray(field.args) && field.args.length > 0) {
      const name = field.name;

      const argument = field.args[0] as GraphQLArgument;

      const args = ArgsBuilder(argument);
      const query = (
        <div className="item">
          <a className="item__field-name" href="#">
            {name}
          </a>
          ({args}):{' '}
          <a className="item__type" href="#">
            {name.charAt(0).toUpperCase() + name.slice(1)}
          </a>
        </div>
      );
      return query;
    } else {
      const query = <div>NONNONONONONONONONONONONOONONON</div>;
      return query;
    }
  }

  function renderDoc() {
    const queryFields: GraphQLField<object, object>[] = [];

    for (const field in props.fields) {
      const fieldObject = props.fields[field];
      queryFields.push(fieldObject);
    }

    return (
      <div className="doc-explorer">
        <h3 className="doc-explorer__title">Fields</h3>
        {/* Отображение данных */}
        {queryFields.map((child, index) => (
          <div key={index} className="item">
            {builderItem(child)}
          </div>
        ))}
      </div>
    );
  }

  return renderDoc();
}

export default DocGenerator;
