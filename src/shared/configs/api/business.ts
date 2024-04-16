import type { PageData } from '@/shared/types';
import type { BuniesssUser } from '@/shared/types/business';

import { request } from './request';

export const getBusinessUserList = (params: any) =>
  request<PageData<BuniesssUser>>('get', '/business/list', params);
