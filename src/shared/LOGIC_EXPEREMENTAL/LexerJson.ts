// Лексический анализатор для разбиения JSON-строки на токены
interface Token {
  type: string;
  value: string;
}

class LexerJson {
  private tokens: Token[] = [];

  private currToken = '';

  public parse(jsonStr: string) {
    for (const char of jsonStr) {
      if (
        char === '{' ||
        char === '}' ||
        char === '[' ||
        char === ']' ||
        char === ':' ||
        char === ','
      ) {
        if (this.currToken) {
          this.addToken(this.currToken);
          this.currToken = '';
        }
        this.tokens.push({ type: 'Punctuation', value: char });
      } else if (char !== ' ' && char !== '\n' && char !== '\t' && char !== '\r') {
        this.currToken += char;
      }
    }

    if (this.currToken) {
      this.addToken(this.currToken);
    }

    return this.tokens;
  }

  private addToken(value: string) {
    let type: string;
    if (/^-?\d+\.?\d*$/.test(value)) {
      type = 'Number';
    } else if (/^"([^"\\]|\\.)*"$/.test(value)) {
      type = 'String';
    } else if (value === 'true' || value === 'false') {
      type = 'Boolean';
    } else if (value === 'null') {
      type = 'Null';
    } else {
      throw new Error(`Unknown token: ${value}`);
    }
    this.tokens.push({ type, value });
  }
}

export default LexerJson;
