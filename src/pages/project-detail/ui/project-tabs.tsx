import { Project } from '@/entities/project/model';

import 'gantt-task-react/dist/index.css';
import { GanttProject } from './gantt-project';
import { ProjectOverview } from './project-overview';
import { ListSubTask } from './list-sub-task';
import { ListUserStory } from './list-user-story';
import { Tabs, TabsProps } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '@/stores';
import { setActiveTabList } from '@/stores/store/project.store';
import { ReactNode } from 'react';
import { UploadDocument } from './upload-document';

type Props = {
  project: Project;
  refetchProjectDetail: () => void;
  children: ReactNode;
};

export const ProjectTabs = ({ project, refetchProjectDetail }: Props) => {
  const dispatch = useDispatch();
  const { activeTabList } = useSelector((state: AppState) => state.project);
  const actionSetActiveTabList = (v: string) => dispatch(setActiveTabList(v));

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Overview',
      children: <ProjectOverview project={project} />
    },
    {
      key: '2',
      label: 'List',
      children: (
        <div className="user-stories">
          <ListUserStory
            project={project}
            refetchProjectDetail={refetchProjectDetail}
          />
          <ListSubTask
            project={project}
            refetchProjectDetail={refetchProjectDetail}
          />
        </div>
      )
    },
    {
      key: '3',
      label: 'Document',
      children: (
        <UploadDocument
          documents={project.documents}
          refetchProjectDetail={refetchProjectDetail}
        />
      )
    },
    {
      key: '4',
      label: 'Workflow',
      children: <GanttProject />
    }
  ];

  return (
    <div className="mb-2">
      <Tabs
        accessKey={activeTabList}
        defaultActiveKey={activeTabList}
        onChange={(v: string) => actionSetActiveTabList(v)}
        items={items}
      />
    </div>
  );
};
