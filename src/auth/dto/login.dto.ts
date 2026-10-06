import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'ایمیل وارد شده معتبر نیست' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'کلمه عبور الزامی است' })
  password: string;
}