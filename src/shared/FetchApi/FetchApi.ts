import { buildClientSchema, getIntrospectionQuery, GraphQLSchema, printSchema } from 'graphql';

interface ErrorFieldsType {
  message?: string;
  stack?: string;
}

interface ErrorType {
  error?: ErrorFieldsType;
}

class FetchApi {
  static instance: FetchApi = new FetchApi();
  private readonly url = 'https://countries.trevorblades.com';

  public async RequestQuery(queryText: string, variable: string): Promise<object | null> {
    try {
      let variableValue = {};
      if (variable) {
        variableValue = JSON.parse(variable);
      }
      const res = await fetch(this.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: queryText,
          variables: variableValue,
        }),
      });

      const data: object = await res.json();

      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  public async RequestIntrospection(): Promise<GraphQLSchema | null> {
    try {
      const shemaUrl = this.url + '/graphql';
      const introspectionQuery = getIntrospectionQuery({ descriptions: false });
      const res = await fetch(shemaUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: introspectionQuery, variables: {} }),
      });

      const result = await res.json();
      const schema = buildClientSchema(result.data);
      return schema;
    } catch (error) {
      console.error('There was a problem with the fetch schema:', error);
      return null;
    }
  }
}

export default FetchApi;
