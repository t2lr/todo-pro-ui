import { PhaseResDto } from '.';

export type PhasePaginationDto = {
  phases: PhaseResDto[];
  total: number;
  pageIndex: number;
  pageSize: number;
};
