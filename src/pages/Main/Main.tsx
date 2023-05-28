import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@shared/firebase/firebase';
import { useState } from 'react';
import FetchApi from '@shared/FetchApi/FetchApi';
import IDE from '@widgets/IDE/IDE';
import './main.style.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@shared/store/store';
import ModalError from '@widgets/Modal/ModalError';
import { changeShowModal, setErrorValue } from '@shared/store/textEditorSlice';

function Main() {
  const [dataAPI, setDataAPI] = useState('');
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  const variable = useSelector((state: RootState) => state.ide.text);
  const dispatch = useDispatch();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  const handlerIDE = async (data: string) => {
    const request = await FetchApi.instance.RequestQuery(data, variable);
    if (request instanceof Error) {
      dispatch(setErrorValue(request.message));
      dispatch(changeShowModal(true));
    } else {
      const dataSTR = JSON.stringify(request, null, 2);
      setDataAPI(dataSTR);
    }
  };

  return (
    <>
      <div className="main">
        <IDE handler={handlerIDE} responce={dataAPI} />
      </div>
      <ModalError />
    </>
  );
}

export default Main;
