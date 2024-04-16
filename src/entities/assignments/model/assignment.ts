import { User } from '@/entities/user/model';

export type Assignment = {
  id: string;
  project_id: string;
  user_id: string;
  position: string;
  user?: User;
};

export type AssignmentList = {
  project_id: string;
  assignments: Assignment[];
};
