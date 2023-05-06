import React, { useState } from 'react';
import { VerticalResizePanel, HorizontalResizePanel, Layout } from '../../features/ResizePanel';
import TextEditor from '../../features/TextEditor/TextEditor';
import PanelTool from '../PanelTool/PanelTool';
import ResponceView from '../../features/ResponceView/ResponceView';
import style from './ide.module.scss';

const defaultText = `
    query {
        countries {
            code
        }
    }
`.trim();

interface IIDE {
  handler: (data: string) => void;
  responce: string;
}

function IDE(props: IIDE) {
  const [isVariablesActive, setVariablesActive] = useState(true);
  const [isHeadersActive, setHeadersActive] = useState(false);

  const [text, setText] = useState(defaultText);

  const handlerButtonClick = () => {
    props.handler(text);
  };

  const handlerGetText = (data: string) => {
    setText(data);
  };

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
                <TextEditor defaultText={text} handler={handlerGetText} />
              </section>
            </Layout>
            <Layout>
              <section className={style.ide}>
                <div className={style.header}>
                  <button onClick={handlerVariablesClick}>Variables</button>
                  <button onClick={handlerHeadersClick}>Headers</button>
                </div>
                {isVariablesActive && <TextEditor defaultText="VARIABLES" />}
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
