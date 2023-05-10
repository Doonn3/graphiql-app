import Header from '../widgets/Header';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import Welcome from '../pages/Welcome/Welcome';
import Main from '../pages/Main/Main';
import PageNotFound from '../pages/PageNotFound/PageNotFound';
import Login from '../features/Login/Login';
import Singup from '../features/Singup/Singup';

function App() {
  return (
    <>
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
