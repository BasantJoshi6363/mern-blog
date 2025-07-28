import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext'
import { Navigate } from 'react-router-dom';
import Loader from './Loader';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, user } = useContext(AuthContext);
    if (!(isAuthenticated && user)) {
        <Loader />
    }

        if (!isAuthenticated) {
            return <Navigate to={"/login"} />
        }
        return children;

    }

    export default ProtectedRoute