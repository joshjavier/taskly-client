import { useUser } from '@/context/UserContext';
import { Navigate, Outlet } from 'react-router';

export default function PrivateRoute() {
  const { user } = useUser();
  return user ? <Outlet /> : <Navigate to="/signin" />;
}
