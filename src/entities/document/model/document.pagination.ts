import { DocumentResDto } from '../dto';

export type DocumentPaginationDto = {
  documents: DocumentResDto[];
  total: number;
  pageIndex: number;
  pageSize: number;
};
