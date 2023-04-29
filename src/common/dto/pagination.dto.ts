import { IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class PaginationDto {
  @IsOptional()
  @Transform(({ value }) => {
    const page = parseInt(value) ?? 1;

    if (page < 0) {
      return 1;
    }

    return page;
  })
  page?: number = 1;

  @IsOptional()
  @Transform(({ value }) => {
    const perPage = parseInt(value) ?? 10;

    if (perPage > 100) {
      return 100;
    }

    return perPage;
  })
  perPage?: number = 10;
}
