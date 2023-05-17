import Header from '@widgets/Header/Header';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import Login from '../features/Login/Login';
import Singup from '../features/Singup/Singup';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../shared/firebase/firebase';
import UncontrolledExample from '@pages/Welcome/Welcome';
import Main from '@pages/Main/Main';
import PageNotFound from '@pages/PageNotFound/PageNotFound';
import Foooter from '@widgets/Footer';

function App() {
  const [, loading] = useAuthState(auth);

  return (
    <>
      {loading && (
        <div className="spinner-wrapper bg-dark">
          <div className="spinner-border text-light" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      <Header />
      <Routes>
        <Route path="" element={<UncontrolledExample />} />
        <Route path="/main" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/singup" element={<Singup />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Foooter />
    </>
  );
}

export default App;
