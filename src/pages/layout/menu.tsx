import type { FC } from 'react';

import { Menu } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { setUserItem } from '@/stores/store/user.store';

import { AppState } from '@/stores';
import { Project } from '@/entities/project/model';

interface MenuProps {
  projects: Project[];
  openKey?: string;
  onChangeOpenKey: (key?: string) => void;
  selectedKey: string;
  onChangeSelectedKey: (key: string) => void;
}

const MenuComponent: FC<MenuProps> = (props) => {
  const { openKey, onChangeOpenKey, selectedKey, onChangeSelectedKey } = props;
  const { device, locale } = useSelector((state: AppState) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getTitle = (menu: any) => {
    return (
      <div className="flex">
        <div>{menu.label[locale]}</div>
      </div>
    );
  };

  const onMenuClick = (path: string) => {
    onChangeSelectedKey(path);
    navigate(path);

    if (device !== 'DESKTOP') {
      dispatch(setUserItem({ collapsed: true }));
    }
  };

  const onOpenChange = (keys: string[]) => {
    const key = keys.pop();

    onChangeOpenKey(key);
  };

  const menuList = [
    {
      code: 'worklog',
      label: {
        en_US: 'Worklog'
      },
      icon: 'worklog',
      path: '/worklog'
    },
    {
      code: 'project',
      label: {
        en_US: 'Project'
      },
      icon: 'project',
      path: '/project',
      children: props.projects.map((project) => ({
        code: project.title,
        label: {
          en_US: project.title
        },
        path: `/project/${project.id}`
      }))
    }
  ];

  return (
    <Menu
      mode="inline"
      selectedKeys={[selectedKey]}
      openKeys={openKey ? [openKey] : []}
      onOpenChange={onOpenChange}
      onSelect={(k) => onMenuClick(k.key)}
      className="layout-page-sider-menu text-2"
      items={menuList.map((menu) => {
        return menu.children
          ? {
              key: menu.code,
              label: getTitle(menu),
              children: menu.children.map((child: any) => ({
                key: child.path,
                label: <div>{child.label[locale]}</div>
              }))
            }
          : {
              key: menu.path,
              label: getTitle(menu)
            };
      })}
    ></Menu>
  );
};

export default MenuComponent;
