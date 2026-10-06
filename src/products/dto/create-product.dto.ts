import { IsNotEmpty, IsNumber, IsString, Min } from "class-validator";

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  
  title: string;

  @IsNumber()
  @Min(10)
  price: number;
}
