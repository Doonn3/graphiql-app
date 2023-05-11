// Лексический анализатор для разбиения JSON-строки на
// const jsonTest = `{
// "data": {
// "countries": [
// {
// "code": "AD"
// },
// ]
// }
// }`;

const match = ['{', '}', '[', ']', ':', ','];

type TokenType =
  | 'ObjectOpen'
  | 'ObjectClose'
  | 'ArrayOpen'
  | 'ArrayClose'
  | 'Assign'
  | 'Punctuation'
  | 'Variable'
  | 'Literal';

export interface Token {
  type: TokenType;
  value: string;
}

class LexerJson {
  private tokens: Token[] = [];

  public parse(jsonStr: string) {
    let string = '';
    for (const char of jsonStr) {
      if (match.includes(char)) {
        if (string.trim().length > 0) {
          string = string.trim();
          const type = this.typeDefinition(string);
          this.addToken(type, string);
          string = '';
        }
        const type = this.typeDefinition(char);
        this.addToken(type, char);
      } else {
        string += char;
      }
    }

    return this.tokens;
  }

  private typeDefinition(value: string): TokenType | null {
    if (value === '{') return 'ObjectOpen';
    if (value === '}') return 'ObjectClose';
    if (value === '[') return 'ArrayOpen';
    if (value === ']') return 'ArrayClose';
    if (value === ':') return 'Assign';
    if (value === ',') return 'Punctuation';

    // if (typeof Number(value) === 'number') return 'Number';
    if (value === 'false' || value === 'true') return 'Literal';
    // if (value === 'null') return 'Null';
    if (typeof value === 'string') return 'Variable';

    return null;
  }

  private addToken(type: TokenType | null, value: string) {
    if (type === null) return;
    this.tokens.push({ type: type, value });
  }
}

export default LexerJson;
