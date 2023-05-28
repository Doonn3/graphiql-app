import { GraphQLSchema } from 'graphql';
import TypeDoc from '../TypeDoc/TypeDoc';

interface SchemaDocProps {
  schema?: GraphQLSchema;
}

function SchemaDoc({ schema }: SchemaDocProps) {
  const queryType = schema?.getQueryType();
  const mutationType = schema?.getMutationType();
  const subscriptionType = schema?.getSubscriptionType();

  return (
    <div>
      <h2>Schema</h2>
      {queryType && (
        <div>
          <TypeDoc type={queryType} />
        </div>
      )}
      {mutationType && (
        <div>
          <h3>Mutation</h3>
          <TypeDoc type={mutationType} />
        </div>
      )}
      {subscriptionType && (
        <div>
          <h3>Subscription</h3>
          <TypeDoc type={subscriptionType} />
        </div>
      )}
    </div>
  );
}

export default SchemaDoc;
