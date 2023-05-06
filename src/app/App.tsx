import Header from '../widgets/Header/Header';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import Welcome from '../pages/Welcome/Welcome';
import Main from '../pages/Main/Main';
import PageNotFound from '../pages/PageNotFound/PageNotFound';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="" element={<Welcome />} />
        <Route path="/main" element={<Main />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
