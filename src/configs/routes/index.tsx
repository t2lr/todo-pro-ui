import type { FC } from 'react';
import { Navigate, RouteObject, useRoutes } from 'react-router-dom';

import WrapperRouteComponent from './config';

import LoginPage from '@/pages/login';
import LayoutPage from '@/pages/layout';
import HomePage from '@/pages/home';

const routeList: RouteObject[] = [
  {
    path: '/login',
    element: (
      <WrapperRouteComponent element={<LoginPage />} titleId="title.login" />
    )
  },
  {
    path: '/',
    element: <WrapperRouteComponent element={<LayoutPage />} titleId="" />,
    children: [
      {
        path: '',
        element: <Navigate to="home" />
      },
      {
        path: 'home',
        element: <WrapperRouteComponent element={<HomePage />} titleId="" />
      }
    ]
  }
];

const RenderRouter: FC = () => {
  const element = useRoutes(routeList);

  return element;
};

export default RenderRouter;
