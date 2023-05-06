import { useState } from 'react';
import style from './text-editor.module.scss';

interface ITextEditor {
  defaultText?: string;
  handler?: (data: string) => void;
}

function TextEditor(props: ITextEditor) {
  const [value, setValue] = useState(props.defaultText || '');

  const handlerKeyDown = (event: React.KeyboardEvent) => {
    if (props.handler === undefined) return;
    if (event.ctrlKey && event.code === 'Space') {
      // Передача данных callback function на верхний уровень
      props.handler(value);
    }
  };

  const handlerInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.currentTarget.value);
  };

  return (
    <textarea
      className={style.editor}
      onKeyDown={handlerKeyDown}
      onInput={handlerInput}
      value={value}
    ></textarea>
  );
}

export default TextEditor;
