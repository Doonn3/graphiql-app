export type ExpressionType = 'ObjectExpression' | 'ArrayExpression' | 'PropertyExpression';

type ArrType = Array<string | number | boolean | object>;

export type ValueType = number | string | object | ArrType | boolean | null;

export interface INode {
  type: ExpressionType;
  value: ValueType;
}
