import FetchApi from '../../../shared/FetchApi/FetchApi';

async function getSchema() {
  const testGetSchema = await FetchApi.instance.RequestIntrospection();
  return testGetSchema;
}

export { getSchema };
