import { Gantt, Task } from 'gantt-task-react';

const tasks: Task[] = [
  {
    start: new Date(2024, 11, 1),
    end: new Date(2024, 11, 11),
    name: 'Idea',
    id: 'Task 0',
    type: 'task',
    progress: 45,
    isDisabled: true,
    styles: { progressColor: '#ffbb54', progressSelectedColor: '#ff9e0d' }
  },
  {
    start: new Date(2024, 11, 1),
    end: new Date(2024, 11, 11),
    name: 'Idea',
    id: 'Task 0',
    type: 'task',
    progress: 45,
    isDisabled: true,
    styles: { progressColor: '#ffbb54', progressSelectedColor: '#ff9e0d' }
  },
  {
    start: new Date(2024, 11, 1),
    end: new Date(2024, 11, 11),
    name: 'Idea',
    id: 'Task 0',
    type: 'task',
    progress: 45,
    isDisabled: true,
    styles: { progressColor: '#ffbb54', progressSelectedColor: '#ff9e0d' }
  },
  {
    start: new Date(2024, 11, 1),
    end: new Date(2024, 11, 11),
    name: 'Idea',
    id: 'Task 0',
    type: 'task',
    progress: 45,
    isDisabled: true,
    styles: { progressColor: '#ffbb54', progressSelectedColor: '#ff9e0d' }
  },
  {
    start: new Date(2024, 11, 1),
    end: new Date(2024, 11, 11),
    name: 'Idea',
    id: 'Task 0',
    type: 'task',
    progress: 45,
    isDisabled: true,
    styles: { progressColor: '#ffbb54', progressSelectedColor: '#ff9e0d' }
  },
  {
    start: new Date(2024, 11, 1),
    end: new Date(2024, 11, 11),
    name: 'Idea',
    id: 'Task 0',
    type: 'task',
    progress: 45,
    isDisabled: true,
    styles: { progressColor: '#ffbb54', progressSelectedColor: '#ff9e0d' }
  },
  {
    start: new Date(2024, 11, 1),
    end: new Date(2024, 11, 11),
    name: 'Idea',
    id: 'Task 0',
    type: 'task',
    progress: 45,
    isDisabled: true,
    styles: { progressColor: '#ffbb54', progressSelectedColor: '#ff9e0d' }
  }
];

export const GanttProject = () => {
  return (
    <div className="mx-2">
      <Gantt tasks={tasks} />
    </div>
  );
};
