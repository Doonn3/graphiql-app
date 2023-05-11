import Header from '../widgets/Header';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import Welcome from '../pages/Welcome/Welcome';
import Main from '../pages/Main/Main';
import PageNotFound from '../pages/PageNotFound/PageNotFound';
import Login from '../features/Login/Login';
import Singup from '../features/Singup/Singup';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../shared/firebase/firebase';

function App() {
  const [user, loading] = useAuthState(auth);

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
        <Route path="" element={<Welcome />} />
        <Route path="/main" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/singup" element={<Singup />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
