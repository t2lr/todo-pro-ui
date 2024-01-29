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

import Avator from '@/configs/assets/header/avator.jpeg';
import EnUsSvg from '@/configs/assets/header/en_US.svg?react';
import LanguageSvg from '@/configs/assets/header/language.svg?react';
import MoonSvg from '@/configs/assets/header/moon.svg?react';
import SunSvg from '@/configs/assets/header/sun.svg?react';
import ZhCnSvg from '@/configs/assets/header/zh_CN.svg?react';
import AntdSvg from '@/configs/assets/logo/antd.svg';
import ReactSvg from '@/configs/assets/logo/react.svg';

import { LocaleFormatter, useLocale } from '@/shared/locales';
import { setGlobalState } from '@/stores/global.store';
import { setUserItem } from '@/stores/user.store';

import { logoutAsync } from '@/stores/actions/user.action';
import HeaderNoticeComponent from './notice';
import { AppState } from '@/stores';

const { Header } = Layout;

interface HeaderProps {
  collapsed: boolean;
  toggle: () => void;
}

type Action = 'userInfo' | 'userSetting' | 'logout';

const HeaderComponent: FC<HeaderProps> = ({ collapsed, toggle }) => {
  const { logged, locale, device, avatar } = useSelector(
    (state: AppState) => state.user
  );
  const { theme } = useSelector((state: AppState) => state.global);
  const navigate = useNavigate();
  const token = antTheme.useToken();
  const dispatch = useDispatch();
  const { formatMessage } = useLocale();

  const onActionClick = async (action: Action) => {
    switch (action) {
      case 'userInfo':
        return;
      case 'userSetting':
        return;
      case 'logout':
        // const res = Boolean(await dispatch(logoutAsync()));

        // res && navigate('/login');

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
          xpia365
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

          {logged ? (
            <Dropdown
              menu={{
                items: [
                  {
                    key: '1',
                    icon: <UserOutlined />,
                    label: (
                      <span onClick={() => navigate('/dashboard')}>
                        <LocaleFormatter id="header.avator.account" />
                      </span>
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
                <img
                  src={avatar || Avator}
                  className="user-avator"
                  alt="avator"
                />
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
