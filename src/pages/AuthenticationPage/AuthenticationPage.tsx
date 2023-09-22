import { useEffect } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import { Loader } from '../../shared/ui/Loader/Loader';

export const AuthenticationPage = () => {
  const { hash } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (hash) {
      const token = hash
        .slice(1)
        .split('&')
        .find((element) => element.startsWith('access_token'))
        ?.split('=')[1];

      const href = localStorage.getItem('href');
      if (href && token) {
        localStorage.setItem('spotify/access-token', token);
        navigate(`${href}`);
        localStorage.removeItem('href');
      } else if (token) {
        localStorage.setItem('spotify/access-token', token);
        navigate('/');
      }
    }
  }, [hash, navigate]);

  return <Loader />;
};
