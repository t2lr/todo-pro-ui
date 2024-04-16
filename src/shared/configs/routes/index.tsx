import type { FC } from 'react';
import { Navigate, Outlet, RouteObject, useRoutes } from 'react-router-dom';

import WrapperRouteComponent from './config';

import LoginPage from '@/pages/login';
import SignupPage from '@/pages/invitation';
import LayoutPage from '@/pages/layout';
import WorkLogPage from '@/pages/worklog';
import ProjectDetailPage from '@/pages/project-detail';

const routeList: RouteObject[] = [
  {
    path: '/login',
    element: (
      <WrapperRouteComponent element={<LoginPage />} titleId="title.login" />
    )
  },
  {
    path: '/invitation',
    element: (
      <WrapperRouteComponent element={<SignupPage />} titleId="title.signup" />
    )
  },
  {
    path: '/',
    element: <WrapperRouteComponent element={<LayoutPage />} titleId="" />,
    children: [
      {
        path: '',
        element: <Navigate to="worklog" />
      },
      {
        path: 'worklog',
        element: <WrapperRouteComponent element={<WorkLogPage />} titleId="" />
      },
      {
        path: 'project',
        element: <Outlet />,
        children: [
          {
            path: ':projectId',
            element: (
              <WrapperRouteComponent
                element={<ProjectDetailPage />}
                titleId="Project"
              />
            )
          }
        ]
      }
    ]
  }
];

const RenderRouter: FC = () => {
  const element = useRoutes(routeList);

  return element;
};

export default RenderRouter;
