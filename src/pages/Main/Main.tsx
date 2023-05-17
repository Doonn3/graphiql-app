import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@shared/firebase/firebase';
import { useState } from 'react';
import FetchApi from '@shared/FetchApi/FetchApi';
import IDE from '@widgets/IDE/IDE';
import './main.style.scss';

function Main() {
  // TEST
  const [dataAPI, setDataAPI] = useState('');
  const [user, loading] = useAuthState(auth);
  const [variable, setVariable] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  const handlerIDE = async (data: string) => {
    const test = await FetchApi.instance.RequestQuery(data, variable);
    const dataSTR = JSON.stringify(test, null, 2);
    setDataAPI(dataSTR);
  };
  //<<TEST

  const getVariables = (value: string) => {
    setVariable(value);
  };

  return (
    <div className="main">
      <IDE handler={handlerIDE} responce={dataAPI} handlerVariables={getVariables} />
    </div>
  );
}

export default Main;
