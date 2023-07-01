import { useCallback, useEffect } from 'react';

import { Navigate, useLocation } from 'react-router-dom';

import { authSpotify } from '../../api/login';
import { Loader } from '../../shared/ui/Loader/Loader';

export const Auth = () => {
  const { hash } = useLocation();

  const saveToken = useCallback(() => {
    authSpotify();
    if (hash) {
      const token = hash
        .slice(1)
        .split('&')
        .find((element) => element.startsWith('access_token'))
        ?.split('=')[1];

      if (token) {
        localStorage.setItem('spotify/access-token', token);
      }
    }
  }, [hash]);

  useEffect(() => {
    if (!localStorage.getItem('spotify/access-token')) {
      saveToken();
    }
  }, [saveToken]);

  return localStorage.getItem('spotify/access-token') ? (
    <Navigate to="/" />
  ) : (
    <Loader />
  );
};
