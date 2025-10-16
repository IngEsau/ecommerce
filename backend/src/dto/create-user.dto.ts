
export class CreateUserDto {
  name: string;
  lastname: string;
  email: string;
  phone: string;
  password: string;
  image?: string;
  notification_token?: string;

  // constructor to initialize the DTO
  /* constructor (createuserDto: CreateUserDto) {
    this.name = createuserDto.name;
    this.lastname = createuserDto.lastname;
    this.email = createuserDto.email;
    this.phone = createuserDto.phone;
    this.password = createuserDto.password;
    this.image = createuserDto.image;
    this.notification_token = createuserDto.notification_token;
  } */
}
