class FetchApi {
  static instance: FetchApi = new FetchApi();
  private readonly uri = 'https://countries.trevorblades.com';

  public async RequestQuery(queryText: string): Promise<object> {
    const res = await fetch(this.uri, {
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
}

export default FetchApi;
