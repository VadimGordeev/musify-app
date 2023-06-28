import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { MainSection } from '../features/MainSection/MainSection';
import { MainLayout } from '../layouts/MainLayout/MainLayout';
import { FirstPage } from '../pages/FirstPage/FirstPage';
import { Loader } from '../shared/ui/Loader/Loader';

const router = createBrowserRouter([
  {
    Component: MainLayout,
    path: '/',
    children: [
      {
        index: true,
        Component: MainSection
      },
      {
        path: '/loader',
        Component: Loader
      }
    ]
  },
  {
    path: '/test',
    Component: FirstPage
  },
  {
    path: '*',
    element: <div>Page not found</div>
  }
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
