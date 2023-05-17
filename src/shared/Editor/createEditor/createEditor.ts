import { EditorState, Extension } from '@codemirror/state';
import { EditorView, keymap, lineNumbers } from '@codemirror/view';
import { oneDark } from '@codemirror/theme-one-dark';
import { autocompletion } from '@codemirror/autocomplete';
import { defaultKeymap } from '@codemirror/commands';
import { json } from '@codemirror/lang-json';

export type EditorViewType = EditorView;
type SupportLang = 'json' | 'graphql';
let lang: Extension;

function createEditor(
  parent: HTMLElement,
  langSupport: SupportLang,
  isEditable = true,
  handler?: (event: string) => void
) {
  if (langSupport === 'json') {
    lang = json();
  } else if (langSupport === 'graphql') {
    lang = json();
  }

  const state = EditorState.create({
    extensions: [
      lang,
      autocompletion({ selectOnOpen: true, activateOnTyping: true }),
      oneDark,
      EditorView.editable.of(isEditable),
      lineNumbers(),
      keymap.of(defaultKeymap),
      EditorView.updateListener.of((update) => {
        if (update.docChanged) {
          const value = update.state.doc.sliceString(0);
          if (handler) {
            handler(value);
          }
        }
      }),
    ],
  });

  const view = new EditorView({
    state,
    parent,
  });

  return { state, view };
}

export default createEditor;
