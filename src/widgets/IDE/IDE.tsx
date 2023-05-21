import style from './ide.module.scss';
import './ide.scss';
import { useState } from 'react';
import { VerticalResizePanel, HorizontalResizePanel, Layout } from '@features/ResizePanel';
import TextEditor from '@features/TextEditor/TextEditor';
import PanelTool from '@widgets/PanelTool/PanelTool';
import ResponceView from '@features/ResponceView/ResponceView';
import GraphQLEditor from './components/GraphQLEditor';
import VariablesEditor from './components/VariablesEditor';
import { useSelector } from 'react-redux';
import { RootState } from '@shared/store/store';

interface IIDE {
  handler: (data: string) => void;
  responce: string;
}

function IDE(props: IIDE) {
  const [isVariablesActive, setVariablesActive] = useState(true);
  const [isHeadersActive, setHeadersActive] = useState(false);

  const toggleActive = isVariablesActive ? 'active' : null;
  const toggleActiveHeader = isHeadersActive ? 'active' : null;
  const queryValue = useSelector((state: RootState) => state.ide.queryValue);

  const handlerButtonClick = () => {
    props.handler(queryValue);
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
                  <button className="btn-start btn btn-secondary" onClick={handlerButtonClick}>
                    Start
                  </button>
                </div>
                <GraphQLEditor />
              </section>
            </Layout>
            <Layout>
              <section className={style.ide}>
                <div className={style.header}>
                  <button
                    className={`btn btn-secondary me-3 ${toggleActive}`}
                    onClick={handlerVariablesClick}
                  >
                    Variables
                  </button>
                  <button
                    className={`btn btn-secondary ${toggleActiveHeader}`}
                    onClick={handlerHeadersClick}
                  >
                    Headers
                  </button>
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
