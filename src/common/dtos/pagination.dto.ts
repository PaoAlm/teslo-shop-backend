import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsPositive, MIN, Min } from "class-validator";

export class PaginationDto {

    @ApiProperty({
        default: 10,
        description: 'Number of items to return',
        required: false
    })
    @IsOptional()
    @IsPositive()
    @Type( () => Number )
    limit?: number;

    @ApiProperty({
        default: 0,
        description: 'Number of items to skip',
        required: false
    })
    @IsOptional()
    @Min(0)
    @Type( () => Number )
    offset?: number;

}