import { createEditor, EditorViewType } from '@shared/Editor';
import { useCallback, useEffect, useRef } from 'react';
import style from '../style/variables-editor.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@shared/store/store';
import { setText } from '@shared/store/textEditorSlice';

function VariablesEditor() {
  const ownRef = useRef<EditorViewType | null>(null);

  const inputValue = useSelector((state: RootState) => state.ide.text);
  const dispatch = useDispatch();

  const ref = useCallback(
    (node: HTMLDivElement) => {
      if (node && !ownRef.current) {
        const handlerEditor = (event: string) => {
          dispatch(setText(event));
        };

        const { view } = createEditor(node, 'json', true, handlerEditor);
        ownRef.current = view;
      }
    },
    [dispatch]
  );

  useEffect(() => {
    if (ownRef.current === null) return;
    const selection = ownRef.current.state.selection;
    if (ownRef.current) {
      ownRef.current.dispatch({
        changes: { from: 0, to: ownRef.current.state.doc.length, insert: inputValue },
        selection,
      });
    }
  }, [inputValue]);

  return <div className={style.editor} ref={ref}></div>;
}

export default VariablesEditor;
