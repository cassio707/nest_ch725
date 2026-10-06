import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsString,
  MinLength,
} from "class-validator";

export class CreateUserDto {
  @IsEmail({}, { message: "ایمیل وارد شده معتبر نیست" })
  email: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @MinLength(6, { message: "کلمه عبور باید حداقل ۶ کاراکتر باشد" })
  password: string;

  @IsString()
  @IsNotEmpty()
  @IsIn(["admin", "user"])
  role: "admin" | "user";
}
