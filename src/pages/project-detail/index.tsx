import { projectQueries } from '@/entities/project/api';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';

import { Project } from '@/entities/project/model';
import { userQueries } from '@/entities/user/api';

import { isArrayNull, objectNotNull } from '@/shared/utils';

import {
  CreareProjectModal,
  CreareSubTaskModal,
  CreateTaskModal,
  CreateUseCaseModal,
  CreateUserStoryModal,
  ProjectHeader,
  ProjectTabs,
  UpdateProjectModal,
  ViewSubTaskModal
} from './ui';

import './style/index.less';
import { priorityQueries } from '@/entities/priority/api';
import { progressQueries } from '@/entities/progress/api';
import { categoryQueries } from '@/entities/category/api';
import { phaseQueries } from '@/entities/phase/api';
import { ProjectOverview } from './ui/project-overview';
import { ListUserStory } from './ui/list-user-story';
import { ListSubTask } from './ui/list-sub-task';
import { GanttProject } from './ui/gantt-project';
import { useEffect } from 'react';
import { useAppSelector } from '@/stores';
import { subTaskQueries } from '@/entities/sub-task/api';

const Index = () => {
  const params = useParams();

  const { details } = useAppSelector((state) => state.subTask);
  const { isFetching, isLoading, data, refetch } = useQuery(
    projectQueries.detail({ id: params.projectId! }, !!params.projectId)
  );

  const dataUsers = useQuery(userQueries.list(1, 100, !!params.projectId));
  const dataPriorities = useQuery(priorityQueries.list(1, 10));
  const dataProgresses = useQuery(progressQueries.list(1, 10));
  const dataCategories = useQuery(categoryQueries.list(1, 10));
  const dataPhases = useQuery(phaseQueries.list(1, 10));
  const dataSubTask = useQuery(
    subTaskQueries.detail(
      { id: details.id, project_id: details.project_id },
      !!details.id
    )
  );

  useEffect(() => {
    if (details.id) dataSubTask.refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [details.id]);

  if (isLoading || isFetching) return;

  return (
    <div className="m-4">
      <ProjectHeader
        assignments={isArrayNull(data?.assignments)}
        project={objectNotNull<Project>(data!)}
      />
      <ProjectTabs project={data!} refetchProjectDetail={refetch}>
        <ProjectOverview project={data!} />
        <>
          <ListUserStory project={data!} refetchProjectDetail={refetch} />
          <ListSubTask project={data!} refetchProjectDetail={refetch} />
        </>
        <GanttProject />
      </ProjectTabs>
      <CreareProjectModal />
      <UpdateProjectModal
        project={objectNotNull<Project>(data!)}
        users={isArrayNull(dataUsers?.data?.users)}
        refetchProjectDetail={refetch}
      />
      <CreateUserStoryModal
        title="User Story"
        projectId={data!.id}
        refetchProjectDetail={refetch}
      />
      <CreateUseCaseModal
        projectId={params.projectId!}
        title="Use Case"
        refetchProjectDetail={refetch}
      />
      <CreateTaskModal
        projectId={params.projectId!}
        title="Task"
        refetchProjectDetail={refetch}
      />
      <CreareSubTaskModal
        project={objectNotNull<Project>(data!)}
        title="Sub Task"
        refetchProjectDetail={refetch}
        priorities={dataPriorities!.data!.priorities}
        progresses={dataProgresses.data!.progress}
        categories={dataCategories.data!.categories}
        phases={isArrayNull(dataPhases.data?.phases)}
      />
      <ViewSubTaskModal
        project={objectNotNull<Project>(data!)}
        priorities={dataPriorities!.data!.priorities}
        progresses={dataProgresses.data!.progress}
        categories={dataCategories.data!.categories}
        phases={isArrayNull(dataPhases.data?.phases)}
        sub_task={dataSubTask.data}
        refetchSubTaskDetail={dataSubTask.refetch}
      />
    </div>
  );
};

export default Index;
