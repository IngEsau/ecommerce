import { IsNotEmpty, IsString } from "class-validator";

export class UpdateUsersDto {
    @IsNotEmpty ()
    @IsString() 
    name: string;

    @IsNotEmpty ()
    @IsString() 
    lastname: string;
    phone: string;  
}