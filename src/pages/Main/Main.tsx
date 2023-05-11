import { useState } from 'react';
import FetchApi from '@shared/FetchApi/FetchApi';
import IDE from '@widgets/IDE/IDE';
import './main.style.scss';

function Main() {
  // TEST
  const [dataAPI, setDataAPI] = useState('');

  const handlerIDE = async (data: string) => {
    const test = await FetchApi.instance.RequestQuery(data);
    const dataSTR = JSON.stringify(test, null, 2);
    setDataAPI(dataSTR);
  };
  //<<TEST

  return (
    <div className="main">
      <IDE handler={handlerIDE} responce={dataAPI} />
    </div>
  );
}

export default Main;
