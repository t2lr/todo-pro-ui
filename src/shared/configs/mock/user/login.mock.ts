import type { LoginResult, Role } from '@/shared/types/user/login';

import { intercepter, mock } from '../config';

mock.mock('/user/login', 'post', (config: any) => {
  const body: LoginResult = JSON.parse(config?.body);

  return intercepter<Partial<LoginResult>>({});
});
