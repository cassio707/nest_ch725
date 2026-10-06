import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class RegisterDto {
  @IsEmail({}, { message: "ایمیل وارد شده معتبر نیست" })
  email: string;

  @IsString()
  @IsNotEmpty({ message: "نام کاربری الزامی است" })
  username: string;

  @IsString()
  @MinLength(6, { message: "کلمه عبور باید حداقل ۶ کاراکتر باشد" })
  password: string;
}
