import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsIn, IsInt, IsNumber, IsOptional, 
         IsPositive, IsString, MinLength 
} from "class-validator";

export class CreateProductDto {

    @ApiProperty({
        example: 'T-Shirt Teslo',
        description: 'Product title',
        uniqueItems: true
    })
    @IsString()
    @MinLength(1)
    title: string;

    @ApiProperty({
        example: 19.99,
        description: 'Product price',
        default: 0
    })
    @IsNumber()
    @IsPositive()
    @IsOptional()
    price?: number;

    @ApiProperty({
        example: 'A comfortable t-shirt for everyday wear',
        description: 'Product description',
        required: false
    })
    @IsString()
    @IsOptional()
    description?: string;

    @ApiProperty({
        example: 't-shirt-teslo',
        description: 'Product slug',
        required: false
    })
    @IsString()
    @IsOptional()
    slug?: string;

    @ApiProperty({
        example: 10,
        description: 'Product stock',
        default: 0
    })
    @IsInt()
    @IsPositive()
    @IsOptional()
    stock?: number;


    @ApiProperty({
        example: ['S', 'M', 'L', 'XL'],
        description: 'Product sizes',
        required: true
    })
    @IsString( { each: true } ) 
    @IsArray()
    sizes: string[];

    @ApiProperty({
        example: 'men',
        description: 'Product gender',
        required: true
    })
    @IsString()
    @IsIn(['men', 'woman', 'kid', 'unisex'])
    gender: string;

    @ApiProperty({
        example: ['shirt', 'clothing', 't-shirt'],
        description: 'Product tags'
    })
    @IsString( { each: true } ) 
    @IsArray()
    @IsOptional()
    tags: string[];

    @ApiProperty({
        example: ['http://example.com/image1.jpg', 'http://example.com/image2.jpg'],
        description: 'Product images'
    })
    @IsString( { each: true } ) 
    @IsArray()
    @IsOptional()
    images?: string[]

}
