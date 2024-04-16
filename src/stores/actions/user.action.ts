import type { LoginParams, LoginResult } from '@/shared/types/user/login';

import type { Dispatch } from '@reduxjs/toolkit';

import { apiLogin, apiLogout } from '@/shared/configs/api/user.api';
import { setUserItem } from '@/stores/user.store';
import { createAsyncAction } from '@/stores/utils';

// typed wrapper async thunk function demo, no extra feature, just for powerful typings
export const loginAsync = createAsyncAction<LoginParams, boolean>((payload) => {
  return async (dispatch: Dispatch) => {
    const { result, status } = await apiLogin(payload);

    if (status) {
      localStorage.setItem('t', result.token);
      localStorage.setItem('username', result.username);
      dispatch(
        setUserItem({
          logged: true,
          username: result.username
        })
      );

      return true;
    }

    return false;
  };
});

// typed wrapper async thunk function demo, no extra feature, just for powerful typings
export const loginGoogleAsync = createAsyncAction<LoginResult, boolean>(
  (payload) => {
    return async (dispatch: Dispatch) => {
      const { username, email, avatar, token } = payload;

      if (email) {
        localStorage.setItem('t', token);
        localStorage.setItem('username', username);
        dispatch(
          setUserItem({
            logged: true,
            username,
            email,
            token,
            avatar
          })
        );

        return true;
      }

      return false;
    };
  }
);

export const logoutAsync = createAsyncAction(() => {
  return async (dispatch: Dispatch) => {
    const { status } = await apiLogout({ token: localStorage.getItem('t')! });

    if (status) {
      localStorage.clear();
      dispatch(
        setUserItem({
          logged: false
        })
      );

      return true;
    }

    return false;
  };
});
