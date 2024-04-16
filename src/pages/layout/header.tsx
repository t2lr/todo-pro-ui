import type { FC } from 'react';

import {
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined
} from '@ant-design/icons';
import { Dropdown, Layout, theme as antTheme, Tooltip } from 'antd';
import { createElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Avator from '@/shared/configs/assets/header/avator.jpeg';
import EnUsSvg from '@/shared/configs/assets/header/en_US.svg?react';
import LanguageSvg from '@/shared/configs/assets/header/language.svg?react';
import MoonSvg from '@/shared/configs/assets/header/moon.svg?react';
import SunSvg from '@/shared/configs/assets/header/sun.svg?react';
import ZhCnSvg from '@/shared/configs/assets/header/zh_CN.svg?react';

import { LocaleFormatter, useLocale } from '@/shared/locales';
import { setGlobalState } from '@/stores/store/global.store';
import { setUserItem } from '@/stores/store/user.store';

import HeaderNoticeComponent from './notice';
import { AppState } from '@/stores';
import useAuth from '@/hooks/useAuth';
import { STATUS } from '@/shared/configs/constants';
import { setStatusModal } from '@/stores/store';

const { Header } = Layout;

interface HeaderProps {
  collapsed: boolean;
  toggle: () => void;
}

type Action = 'userInfo' | 'userSetting' | 'logout';

const HeaderComponent: FC<HeaderProps> = ({ collapsed, toggle }) => {
  const { userId, src, handleLogOut } = useAuth();

  const dispatch = useDispatch();
  const actionModal = (type: STATUS) => dispatch(setStatusModal(type));

  const { locale, device } = useSelector((state: AppState) => state.user);
  const { theme } = useSelector((state: AppState) => state.global);
  const navigate = useNavigate();
  const token = antTheme.useToken();
  const { formatMessage } = useLocale();

  const onActionClick = async (action: Action) => {
    switch (action) {
      case 'userInfo':
        return;
      case 'userSetting':
        return;
      case 'logout':
        await handleLogOut();

        return;
    }
  };

  const toLogin = () => {
    navigate('/login');
  };

  const selectLocale = ({ key }: { key: any }) => {
    dispatch(setUserItem({ locale: key }));
    localStorage.setItem('locale', key);
  };

  const onChangeTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';

    localStorage.setItem('theme', newTheme);
    dispatch(
      setGlobalState({
        theme: newTheme
      })
    );
  };

  return (
    <Header
      className="layout-page-header bg-2"
      style={{ backgroundColor: token.token.colorBgContainer }}
    >
      {device !== 'MOBILE' && (
        <div className="logo font-bold" style={{ width: collapsed ? 80 : 200 }}>
          Fishub
        </div>
      )}
      <div className="layout-page-header-main">
        <div onClick={toggle}>
          <span id="sidebar-trigger">
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </span>
        </div>
        <div className="actions">
          <Tooltip
            title={formatMessage({
              id:
                theme === 'dark'
                  ? 'gloabal.tips.theme.lightTooltip'
                  : 'gloabal.tips.theme.darkTooltip'
            })}
          >
            <span>
              {createElement(theme === 'dark' ? SunSvg : MoonSvg, {
                onClick: onChangeTheme
              })}
            </span>
          </Tooltip>
          <HeaderNoticeComponent />
          <Dropdown
            menu={{
              onClick: (info) => selectLocale(info),
              items: [
                {
                  key: 'zh_CN',
                  icon: <ZhCnSvg />,
                  disabled: locale === 'zh_CN',
                  label: '简体中文'
                },
                {
                  key: 'en_US',
                  icon: <EnUsSvg />,
                  disabled: locale === 'en_US',
                  label: 'English'
                }
              ]
            }}
          >
            <span>{<LanguageSvg />}</span>
          </Dropdown>

          {userId ? (
            <Dropdown
              menu={{
                items: [
                  {
                    key: '1',
                    icon: <UserOutlined />,
                    label: (
                      <div onClick={() => actionModal(STATUS.USER_INFO)}>
                        Profile
                      </div>
                    )
                  },
                  {
                    key: '2',
                    icon: <LogoutOutlined />,
                    label: (
                      <span onClick={() => onActionClick('logout')}>
                        <LocaleFormatter id="header.avator.logout" />
                      </span>
                    )
                  }
                ]
              }}
            >
              <span className="user-action">
                <img src={src || Avator} className="user-avator" alt="avator" />
              </span>
            </Dropdown>
          ) : (
            <span style={{ cursor: 'pointer' }} onClick={toLogin}>
              {formatMessage({ id: 'gloabal.tips.login' })}
            </span>
          )}
        </div>
      </div>
    </Header>
  );
};

export default HeaderComponent;
