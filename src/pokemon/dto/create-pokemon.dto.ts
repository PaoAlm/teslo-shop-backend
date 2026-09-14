import { IsString, IsPositive, MinLength, IsInt, Min } from "class-validator";

export class CreatePokemonDto {

//is  int, is postiive, min 1
@IsInt()
@IsPositive()
@Min(1)
readonly no: number;

//is string, milength 1
@IsString()
@MinLength(1)
name: string;

}
