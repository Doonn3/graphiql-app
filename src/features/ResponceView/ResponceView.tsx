import './responce.scss';
import { useCallback, useEffect, useRef } from 'react';
import { createEditor, EditorViewType } from '@shared/Editor';

interface IResponceView {
  data: string;
}

function ResponceView(props: IResponceView) {
  const editorRef = useRef<EditorViewType | null>(null);

  const ref = useCallback(async (node: HTMLDivElement) => {
    if (node && !editorRef.current) {
      const { view } = createEditor(node, 'json', false);
      editorRef.current = view;
    }
  }, []);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.dispatch({
        changes: { from: 0, to: editorRef.current.state.doc.length, insert: props.data },
      });
    }
  }, [props.data]);

  return <div className="responce" ref={ref}></div>;
}

export default ResponceView;
