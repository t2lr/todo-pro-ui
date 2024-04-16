import Cookies from 'js-cookie';
import { apiClient } from '@/shared/api/base';

import { Author } from '../model';
import { AuthLoginDto, AuthResDto } from '../dto';
import { mapAuthor } from '../mapper';
import { COOKIE_ACCESS_TOKEN_KEY } from '@/shared/configs/constants';

export const signInWithEmailAndPassword = async (
  body: AuthLoginDto
): Promise<Author> => {
  const result = await apiClient.post<AuthResDto>(`/users/login`, body);

  return mapAuthor(result);
};

export const signUpWithEmailAndPassword = async () => {
  try {
    return {};
  } catch (e) {
    alert((e as Error).message);
  }
};

export const onAuthStateHasChanged = async (): Promise<Author> => {
  const result = await apiClient.get<AuthResDto>(`/users/me`);
  return mapAuthor(result);
};

export const logout = async (): Promise<boolean> => {
  await Cookies.remove(COOKIE_ACCESS_TOKEN_KEY);
  return true;
};
