import { IsEmail, Matches } from 'class-validator';

export class CreateUserRequest {
  @IsEmail()
  email: string;

  @Matches(
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!#$%^&*()_+\-=\[\]{};':"\\|,.<>/?])[\w!#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]{8,128}$/,
    {
      message:
        '8자리 이상 128자리 이하의 숫자와 대소문자, 특수문자를 각각 1개 이상 포함한 비밀번호여야 합니다.',
    },
  )
  password: string;
}
