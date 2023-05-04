import React, { useRef, useState } from 'react';
import FetchApi from '../../app/FetchApi/FetchApi';
import IDE from '../../widgets/IDE/IDE';
import ResponceView from '../../widgets/ResponceView/ResponceView';
import { Divider, IDivider } from './components/Divider/Divider';
import { ILayer, Layer } from './components/Layer/Layer';
import './main.style.scss';

function Main() {
  const ideLayerRef = useRef<ILayer>(null);
  const divideRef = useRef<IDivider>(null);
  const responseLayerRef = useRef<ILayer>(null);

  const [offsetX, setOffsetX] = useState(0);
  const [isDragging, setDragging] = useState(false);

  // TEST
  const [dataAPI, setDataAPI] = useState('');

  const handlerIDE = async (data: string) => {
    const test = await FetchApi.instance.RequestQuery(data);
    const dataSTR = JSON.stringify(test, null, 2);
    setDataAPI(dataSTR);
  };
  //<<TEST

  const handleMouseDown = (event: React.MouseEvent) => {
    if (divideRef.current?.htmlElem !== event.target) return;
    const dividerLeft = divideRef.current.left;
    if (dividerLeft === undefined) return;
    setOffsetX(event.clientX - dividerLeft);
    setDragging(true);
  };

  const handleDraggingDivider = (event: React.MouseEvent) => {
    if (isDragging === false) return;
    const mainTarget = event.currentTarget;
    if (!(mainTarget instanceof HTMLDivElement)) return;
    const dividerWidth = divideRef.current?.width;
    if (dividerWidth === undefined) return;

    const containerWidth = mainTarget.offsetWidth;

    const newDividerLeft = event.clientX - offsetX;
    // console.log(newDividerLeft);
    const newSection1Width = newDividerLeft;
    const newSection2Width = containerWidth - newDividerLeft - offsetX;

    ideLayerRef.current?.handler(newSection1Width);
    responseLayerRef.current?.handler(newSection2Width);
    // divideRef.current?.handler(newDividerLeft);
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  return (
    <div
      className="main"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleDraggingDivider}
    >
      <Layer ref={ideLayerRef}>
        <IDE handler={handlerIDE} />
      </Layer>
      <Divider ref={divideRef} />
      <Layer ref={responseLayerRef}>
        <ResponceView data={dataAPI} />
      </Layer>
    </div>
  );
}

export default Main;
