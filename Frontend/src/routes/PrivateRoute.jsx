
import { Navigate } from 'react-router-dom';
import authToken from '../cookies/appCookies';


const PrivateRoute = ({ children }) => {
  const token = document.cookie.split(`${authToken}=`)[1];
  return token ? children : <Navigate to={'/'} />

};


export default PrivateRoute;

