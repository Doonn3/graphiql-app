import { buildClientSchema, getIntrospectionQuery, GraphQLSchema } from 'graphql';

class FetchApi {
  static instance: FetchApi = new FetchApi();
  private readonly url = 'https://countries.trevorblades.com';

  public async RequestQuery(queryText: string): Promise<object> {
    const res = await fetch(this.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: queryText,
      }),
    });

    const data: object = await res.json();

    return data;
  }

  public async RequestIntrospection(): Promise<GraphQLSchema | null> {
    try {
      // const res = await fetch(this.url, {
      // method: 'POST',
      // headers: {
      // 'Content-Type': 'application/json',
      // },
      // body: JSON.stringify({ query: 'query { __schema { types { name } } }' }),
      // });

      // if (!res.ok) {
      // throw new Error(`Network response was not ok: ${res.status}`);
      // }

      // const data = await res.json();

      const shemaUrl = this.url + '/graphql';
      const introspectionQuery = getIntrospectionQuery({ descriptions: false });
      const res = await fetch(shemaUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: introspectionQuery, variables: {} }),
      });

      const result = await res.json();
      const schema = buildClientSchema(result.data);
      // const schema: GraphQLSchema = data;

      return schema;
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      return null;
    }
  }
}

export default FetchApi;
