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

interface IGraphQLEditor {
  handler?: (value: string) => void;
}

const GraphQLEditor = (props: IGraphQLEditor) => {
  const editorRef = useRef<CodeMirror.EditorFromTextArea | null>(null);

  const textAreaRef = useCallback(
    async (node: HTMLTextAreaElement) => {
      if (node && !editorRef.current) {
        const schema = await FetchApi.instance.RequestIntrospection();
        if (schema === null) return;

        editorRef.current = CodeMirror.fromTextArea(node, {
          indentUnit: 2,
          lineNumbers: true,
          gutters: ['lightgrey'],
          fixedGutter: true,
          lineWrapping: true,
          viewportMargin: Infinity,
          theme: 'monokai',
          mode: 'graphql',
          lint: {
            options: {
              schema: schema,
            },
          },
          hintOptions: {
            schema: schema,
            closeOnUnfocus: true,
            completeSingle: true,
          },
          extraKeys: { 'Ctrl-Space': 'autocomplete' },
        });

        editorRef.current.on('inputRead', function (event) {
          if (props.handler === undefined) return;
          props.handler(event.getValue());
        });
      }
    },
    [props]
  );

  return (
    <div className={style.editor}>
      <textarea className={style.CodeMirror} ref={textAreaRef} disabled={true} />
    </div>
  );
};

export default GraphQLEditor;
