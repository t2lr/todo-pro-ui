import { apiClient } from '@/shared/api/base';
import { PhasePaginationDto } from '../dto/phase-pagination';
import { PhaseQuery } from '../query';

export const getPhaseList = async (
  pageIndex: number,
  pageSize: number
): Promise<PhasePaginationDto> => {
  const query: PhaseQuery = { pageIndex, pageSize };
  const result = await apiClient.get<PhasePaginationDto>('/phases', query);

  return {
    phases: result.phases,
    pageIndex: result.pageIndex,
    pageSize: result.pageSize,
    total: result.total
  };
};
