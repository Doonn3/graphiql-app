import CodeMirror from 'codemirror';
import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/lint/lint';
import 'codemirror-graphql/hint';
import 'codemirror-graphql/lint';
import 'codemirror-graphql/mode';
import 'codemirror/addon/hint/show-hint.css';
import 'codemirror/lib/codemirror.css';
import '../style/CodeMirror.scss';
import { useCallback, useRef } from 'react';
import FetchApi from '@shared/FetchApi/FetchApi';
import 'codemirror/theme/monokai.css';
import style from '../style/text-editor.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@shared/store/store';
import { changeShowModal, setErrorValue, setQueryValue } from '@shared/store/textEditorSlice';

const GraphQLEditor = () => {
  const editorRef = useRef<CodeMirror.EditorFromTextArea | null>(null);
  const queryValue = useSelector((state: RootState) => state.ide.queryValue);
  const dispatch = useDispatch();

  const textAreaRef = useCallback(
    async (node: HTMLTextAreaElement) => {
      if (node && !editorRef.current) {
        const schema = await FetchApi.instance.RequestIntrospection();
        if (schema === null) return;
        if (schema instanceof Error) {
          dispatch(setErrorValue(schema.message));
          dispatch(changeShowModal(true));
        }
        editorRef.current = CodeMirror.fromTextArea(node, {
          indentUnit: 2,
          lineNumbers: true,
          gutters: ['lightgrey'],
          fixedGutter: true,
          lineWrapping: true,
          // viewportMargin: Infinity,
          theme: 'monokai',
          mode: 'graphql',
          showCursorWhenSelecting: false,
          lint: {
            options: {
              schema: schema,
            },
          },
          hintOptions: {
            schema: schema instanceof Error ? undefined : schema,
            closeOnUnfocus: false,
            completeSingle: false,
          },
          extraKeys: { 'Ctrl-Space': 'autocomplete' },
        });

        editorRef.current.on('change', function (event) {
          dispatch(setQueryValue(event.getValue()));
        });
      }
    },
    [dispatch]
  );

  return (
    <div className={style.editor}>
      <textarea className={style.CodeMirror} ref={textAreaRef} value={queryValue} disabled={true} />
    </div>
  );
};

export default GraphQLEditor;
