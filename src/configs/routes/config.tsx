import useFirebase from '@/hooks/useFirebase';
import LoginPages from '@/pages/login';
import type { FC, ReactElement } from 'react';

import { PathRouteProps } from 'react-router-dom';

export interface WrapperRouteProps extends PathRouteProps {
  titleId: string;
  auth?: boolean;
}

const WrapperRouteComponent: FC<WrapperRouteProps> = ({
  titleId,
  auth,
  ...props
}) => {
  const { status, userId } = useFirebase();

  if (status !== 'authenticated') return <LoginPages />;
  return props.element as ReactElement;
};

export default WrapperRouteComponent;
