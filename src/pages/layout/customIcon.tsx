import type { FC } from 'react';

import AccountSvg from '@/shared/configs/assets/menu/account.svg?react';
import DashboardSvg from '@/shared/configs/assets/menu/dashboard.svg?react';
import DocumentationSvg from '@/shared/configs/assets/menu/documentation.svg?react';
import GuideSvg from '@/shared/configs/assets/menu/guide.svg?react';
import PermissionSvg from '@/shared/configs/assets/menu/permission.svg?react';

interface CustomIconProps {
  type: string;
}

export const CustomIcon: FC<CustomIconProps> = (props) => {
  const { type } = props;
  let com = <GuideSvg />;

  if (type === 'guide') {
    com = <GuideSvg />;
  } else if (type === 'permission') {
    com = <PermissionSvg />;
  } else if (type === 'dashboard') {
    com = <DashboardSvg />;
  } else if (type === 'account') {
    com = <AccountSvg />;
  } else if (type === 'documentation') {
    com = <DocumentationSvg />;
  } else {
    com = <GuideSvg />;
  }

  return <span className="anticon">{com}</span>;
};
