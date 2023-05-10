import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

function Main() {
  const authUserStatus = useSelector((state: RootState) => state.authUser);

  console.log(authUserStatus);

  return authUserStatus ? <h1>MAIN</h1> : <p>You are not authorized for this page</p>;
}

export default Main;
