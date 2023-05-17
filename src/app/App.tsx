import Header from '@widgets/Header/Header';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import UncontrolledExample from '@pages/Welcome/Welcome';
import Main from '@pages/Main/Main';
import PageNotFound from '@pages/PageNotFound/PageNotFound';
import Foooter from '@widgets/Footer';
import { Suspense } from 'react';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="" element={<UncontrolledExample />} />
        <Route path="/main" element={<Main />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Foooter />
    </>
  );
}

export default function WrappedApp() {
  return (
    <Suspense fallback="...loading">
      <App />
    </Suspense>
  );
}
