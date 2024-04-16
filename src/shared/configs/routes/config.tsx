import useAuth from '@/hooks/useAuth';
import LoginPages from '@/pages/login';
import InvitationPages from '@/pages/invitation';
import type { FC, ReactElement } from 'react';

import { Navigate, PathRouteProps, useLocation } from 'react-router-dom';

export interface WrapperRouteProps extends PathRouteProps {
  titleId: string;
  auth?: boolean;
}

const WrapperRouteComponent: FC<WrapperRouteProps> = ({ ...props }) => {
  const location = useLocation();
  const { status } = useAuth();

  if (status !== 'authenticated' && location.pathname.includes('invitation')) {
    return <InvitationPages />;
  } else if (status !== 'authenticated') {
    return <LoginPages />;
  } else if (location.pathname.includes('login')) {
    return <Navigate to="/" />;
  } else {
    return props.element as ReactElement;
  }
};

export default WrapperRouteComponent;
