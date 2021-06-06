import JwtDecode from 'jwt-decode';
import { getAccessToken } from './token';

export const isTokenValid = () => {
  const token = getAccessToken();
  if (!token || token === '') return false;
  try {
    const { exp }: any = JwtDecode(token);
    if (Date.now() >= exp * 1000) {
      console.log('TOKEN EXPIRADO');
      return false;
    } else {
      return true;
    }
  } catch {
    return false; //token is invalid
  }
};
