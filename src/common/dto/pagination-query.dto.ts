import { IsOptional, IsPositive, IsInt, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationQueryDto {
  @IsOptional()
  @IsInt()
  @IsPositive()
  @Type(() => Number)
  page?: number = 1;

  @IsOptional()
  @IsInt()
  @IsPositive()
  @Max(100)
  @Type(() => Number)
  limit?: number = 10;

  get skip(): number {
    return (this.page - 1) * this.limit;
  }
}
