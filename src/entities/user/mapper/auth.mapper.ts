import { AuthResDto } from '../dto';
import { Author } from '../model';

export const mapAuthor = (dto: AuthResDto): Author => ({
  id: dto.id,
  username: dto.username,
  email: dto.email,
  src: dto.src,
  access_token: dto.access_token
});
