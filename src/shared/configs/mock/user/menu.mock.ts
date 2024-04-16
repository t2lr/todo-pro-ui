import type { MenuList } from '@/shared/types/layout/menu.interface';

import { intercepter, mock } from '../config';

const mockMenuList: MenuList = [
  {
    code: 'dashboard',
    label: {
      zh_CN: '文档',
      en_US: 'Dashboard'
    },
    icon: 'dashboard',
    path: '/dashboard'
  },
  {
    code: 'project',
    label: {
      zh_CN: '文档',
      en_US: 'Project'
    },
    icon: 'project',
    path: '/project',
    children: [
      {
        code: 'routePermission',
        label: {
          zh_CN: '路由权限',
          en_US: 'Route Permission'
        },
        path: '/permission/route'
      },
      {
        code: 'notFound',
        label: {
          zh_CN: '404',
          en_US: '404'
        },
        path: '/permission/404'
      }
    ]
  }
];

mock.mock('/user/menu', 'get', intercepter(mockMenuList));
