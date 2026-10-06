import { PartialType } from "@nestjs/mapped-types";
import { CreateProductDto } from "./create-product.dto.js";

// Get all properties from CreateProductDto and make them optional
export class UpdateProductDto extends PartialType(CreateProductDto) {}
