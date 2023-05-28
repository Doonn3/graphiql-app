import { GraphQLField, GraphQLNonNull, GraphQLObjectType, GraphQLScalarType } from 'graphql';
import { Maybe } from 'graphql/jsutils/Maybe';
import FetchApi from '../../../shared/FetchApi/FetchApi';

interface IArgsType {
  name: string;
  description: string;
}

interface INodeArgs {
  name: string;
  description: string;
  type: IArgsType;
}

interface INodeFields {
  name: string;
  args: [];
  description: string;
  type: IArgsType;
}

interface IDocNode {
  name: string;
  args: INodeArgs[];
  type: INodeFields;
}

class DocNode {
  // private root: GraphQLFieldMap<object, object>;

  private node: GraphQLField<object, object>;

  private GraphQLObject: GraphQLObjectType;

  private fields: GraphQLScalarType | null = null;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(node: GraphQLField<object, object>) {
    this.node = node;
    this.GraphQLObject = node.type as GraphQLObjectType;
    const scalarFields = this.getOfTypeFields();
  }

  getOfTypeFields() {
    const scalarType: GraphQLScalarType[] = [];
    const fields = this.GraphQLObject.getFields();
    for (const field of Object.values(fields)) {
      if (field.type instanceof GraphQLNonNull) {
        if (field.type.ofType instanceof GraphQLScalarType) {
          const ofType = field.type.ofType;
          scalarType.push(ofType);
        }
      }
    }

    return scalarType;
  }

  parse() {
    if (Array.isArray(this.node.args) && this.node.args.length > 0) {
      //
    } else {
      //
    }
  }
}

function parseDocs(schemaQueryType: Maybe<GraphQLObjectType>) {
  // console.log(schemaQueryType, 'QUERY');
  // console.log(schemaQueryType?.getFields(), 'FIELDS');
  const content = schemaQueryType?.getFields();
  console.log(content);
  if (content === undefined) return;
  const f = content.continent;

  const docNode = new DocNode(f);
  docNode.parse();
  // let docInfo: DocInfoType = null;
  // if (schemaQueryType?.name)
}

async function getQueryType() {
  const testGetSchema = await FetchApi.instance.RequestIntrospection();
  const queryType = testGetSchema?.getQueryType();
  return queryType;
}

// async function getFields(schemaQueryType: Maybe<GraphQLObjectType>) {
// const context = await getQueryType();
// const content = context?.getFields();
// if (content === undefined) return;
// const fields = content;
// return fields;
// }

async function getFields() {
  const context = await getQueryType();
  const content = context?.getFields();
  if (content === undefined) return;
  const fields = content;
  return fields;
}

async function test() {
  const testGetSchema = await FetchApi.instance.RequestIntrospection();

  const queryType = testGetSchema?.getQueryType();
  parseDocs(queryType);
  // console.log(queryType, 'QUERY');
  // console.log(queryType?.getFields(), 'FIELDS');
  return testGetSchema?.getTypeMap();
}

// test();

async function getSchema() {
  const testGetSchema = await FetchApi.instance.RequestIntrospection();
  return testGetSchema;
}

export { getFields, getSchema };
