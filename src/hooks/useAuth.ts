import { useSelector } from 'react-redux';
import { RootState } from '@store/index';

export const useAuth = () => {

  return useSelector((state: RootState) => state.auth.token);
};