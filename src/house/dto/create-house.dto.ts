import { IsString, IsOptional, IsArray, ArrayNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateHouseDto {
  @ApiProperty({ example: 'Gryffindor' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Godric Gryffindor' })
  @IsString()
  founder: string;

  @ApiProperty({ example: 'Lion' })
  @IsString()
  animalSymbol: string;

  @ApiProperty({ example: ['bravery', 'nerve'], type: [String] })
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  attributes: string[];

  @ApiProperty({ example: 'red', required: false, default: 'white' })
  @IsOptional()
  @IsString()
  color: string = 'white';
}
