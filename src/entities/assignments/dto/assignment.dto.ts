import { UserResDto } from '@/entities/user/dto';

export type AssignmentResDto = {
  id: string;
  position: string;
  project_id: string;
  user_id: string;
  user: UserResDto;
};
