import { createEditor, EditorViewType } from '@shared/Editor';
import { useCallback, useEffect, useRef, useState } from 'react';
import style from '../style/variables-editor.module.scss';

type HandlerType = (value: string) => void;

interface IVariablesEditor {
  handler?: HandlerType;
}

function VariablesEditor(props: IVariablesEditor) {
  const [value, setValue] = useState('');
  const ownRef = useRef<EditorViewType | null>(null);

  const ref = useCallback((node: HTMLDivElement) => {
    if (node && !ownRef.current) {
      const { view } = createEditor(node, 'json', true, handlerEditor);
      ownRef.current = view;
    }
  }, []);

  useEffect(() => {
    if (ownRef.current) {
      ownRef.current.dispatch({
        changes: { from: 0, to: ownRef.current.state.doc.length, insert: value },
      });
    }
  }, [value]);

  const handlerEditor = (event: string) => {
    setValue(event);
    if (props.handler) props.handler(event);
  };

  return <div className={style.editor} ref={ref}></div>;
}

export default VariablesEditor;
