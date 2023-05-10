import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { Navigate } from 'react-router-dom';

function Main() {
  const authUserStatus = useSelector((state: RootState) => state.authUser);

  return <>{authUserStatus ? <h1>MAIN</h1> : <Navigate to="/login" />}</>;
}

export default Main;
