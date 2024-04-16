import type { GetRoleResult } from '@/shared/types/permission/role.interface';

import { request } from '../request';

/** get role list api */
export const apiGetRoleList = () =>
  request<GetRoleResult>('get', '/permission/role');
