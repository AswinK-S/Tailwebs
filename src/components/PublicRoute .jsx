
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PublicRoute = ({ children }) => {
  const user = useSelector((state) => state.teacher.teacher);
 

  if (user) {
    // User is authenticated
    return <Navigate to="/home" replace />;
  }

  return children;
};

export default PublicRoute;
