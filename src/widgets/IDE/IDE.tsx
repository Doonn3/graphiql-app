import style from './ide.module.scss';
import { useState } from 'react';
import { VerticalResizePanel, HorizontalResizePanel, Layout } from '@features/ResizePanel';
import TextEditor from '@features/TextEditor/TextEditor';
import PanelTool from '@widgets/PanelTool/PanelTool';
import ResponceView from '@features/ResponceView/ResponceView';
import GraphQLEditor from '@features/GraphQLEditor';
import VariablesEditor from '@features/VariablesEditor';

interface IIDE {
  handler: (data: string) => void;
  responce: string;
}

function IDE(props: IIDE) {
  const [isVariablesActive, setVariablesActive] = useState(true);
  const [isHeadersActive, setHeadersActive] = useState(false);

  const [text, setText] = useState('');

  const handlerButtonClick = () => {
    props.handler(text);
  };

  function handlerText(value: string) {
    // props.handler(value);
    console.log(value);
    setText(value);
  }

  const handlerVariablesClick = () => {
    setVariablesActive(true);
    setHeadersActive(false);
  };

  const handlerHeadersClick = () => {
    setHeadersActive(true);
    setVariablesActive(false);
  };

  return (
    <>
      <PanelTool />
      <VerticalResizePanel>
        <Layout>
          <HorizontalResizePanel>
            <Layout>
              <section className={style.ide}>
                <div className={style.header}>
                  <button className={style.btn} onClick={handlerButtonClick}>
                    Start
                  </button>
                </div>
                <GraphQLEditor handler={handlerText} />
              </section>
            </Layout>
            <Layout>
              <section className={style.ide}>
                <div className={style.header}>
                  <button onClick={handlerVariablesClick}>Variables</button>
                  <button onClick={handlerHeadersClick}>Headers</button>
                </div>
                {isVariablesActive && <VariablesEditor />}
                {isHeadersActive && <TextEditor defaultText="HEADERS" />}
              </section>
            </Layout>
          </HorizontalResizePanel>
        </Layout>
        <Layout>
          <ResponceView data={props.responce} />
        </Layout>
      </VerticalResizePanel>
    </>
  );
}

export default IDE;
