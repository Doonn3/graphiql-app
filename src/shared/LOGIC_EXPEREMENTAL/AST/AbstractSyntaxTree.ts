import { Token } from '../LexerJson';
import { ExpressionType, INode, ValueType } from './types/Types';

class RootNode {
  type = 'Root';
  node: INode;

  constructor(node: INode) {
    this.node = node;
  }
}

export class PropertyExpression {
  type: ExpressionType = 'PropertyExpression';
  value: ValueType;
  leftNode: INode;
  rightNode: INode;

  constructor(value: ValueType, leftNode: INode, rightNode: INode) {
    this.value = value;
    this.leftNode = leftNode;
    this.rightNode = rightNode;
  }
}

export class ObjectExpression {
  type: ExpressionType = 'ObjectExpression';
  value: ValueType;
  leftNode: INode;
  rightNode: INode;

  constructor(value: ValueType, leftNode: INode, rightNode: INode) {
    this.value = value;
    this.leftNode = leftNode;
    this.rightNode = rightNode;
  }
}

class AbstractSyntaxTree {
  private tree: RootNode | null = null;

  get Tree() {
    return this.tree;
  }

  private pos = 0;
  public init(tokens: Token[]) {
    while (this.pos < tokens.length) {
      this.createTree(tokens[this.pos]);
      this.pos += 1;
    }
  }

  private createTree(token: Token) {
    if ((token.type = 'Variable')) {
      // const propExp = new PropertyExpression(token.value, );
    }
  }
}

export default AbstractSyntaxTree;
