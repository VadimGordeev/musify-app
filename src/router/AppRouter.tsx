import { useEffect } from 'react';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { MainSection } from '../features/MainSection/MainSection';
import { MainLayout } from '../layouts/MainLayout/MainLayout';
import { Auth } from '../pages/auth/auth';
import { Loader } from '../shared/ui/Loader/Loader';
import { useAppDispatch } from '../store/store.types';
import { fetchUser } from '../store/user/user.api';

const router = createBrowserRouter([
  {
    Component: MainLayout,
    path: '/',
    children: [
      {
        index: true,
        Component: MainSection
      }
    ]
  },
  {
    path: '*',
    element: <div>Page not found</div>
  },
  {
    path: '/auth',
    Component: Auth
  },
  {
    path: '/loader',
    Component: Loader
  }
]);

export const AppRouter = () => {
  const dispatch = useAppDispatch();
  const tokens = localStorage.getItem('spotify/access-token');

  useEffect(() => {
    if (tokens) {
      const promise = dispatch(fetchUser());

      return () => {
        promise.abort('cancelled');
      };
    }
  }, [dispatch, tokens]);

  return <RouterProvider router={router} />;
};
