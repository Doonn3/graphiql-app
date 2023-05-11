import Header from '../widgets/Header';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import UncontrolledExample from '../pages/Welcome/Welcome';
import Main from '../pages/Main/Main';
import PageNotFound from '../pages/PageNotFound/PageNotFound';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="" element={<UncontrolledExample />} />
        <Route path="/main" element={<Main />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
