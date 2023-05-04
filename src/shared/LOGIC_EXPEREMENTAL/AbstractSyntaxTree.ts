export type LiteralType = 'NumberLiteral' | 'StringLiteral' | 'BooleanLiteral' | 'NullLiteral';
type ValueType = number | string | boolean | null;

interface IProperty {
  type: LiteralType;
  value: ValueType;
}

type ExpressionType = 'ObjectExpression' | 'ArrayExpression';

interface INode {
  type: ExpressionType;
  properties: IProperty;
}

class AbstractSyntaxTree {
  //
}

export default AbstractSyntaxTree;
