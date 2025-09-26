import { IsEmail, IsNotEmpty, IsString, MinLength, MaxLength, Matches, IsOptional } from "class-validator";

export class RegisterAuthDto {
    @IsNotEmpty({ message: 'El nombre es obligatorio' })
    @IsString({ message: 'El nombre debe ser texto' })
    @MinLength(2, { message: 'El nombre debe tener al menos 2 caracteres' })
    @MaxLength(50, { message: 'El nombre no puede tener más de 50 caracteres' })
    @Matches(/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/, { message: 'El nombre solo puede contener letras y espacios' })
    name: string;

    @IsNotEmpty({ message: 'El apellido es obligatorio' })
    @IsString({ message: 'El apellido debe ser texto' })
    @MinLength(2, { message: 'El apellido debe tener al menos 2 caracteres' })
    @MaxLength(50, { message: 'El apellido no puede tener más de 50 caracteres' })
    @Matches(/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/, { message: 'El apellido solo puede contener letras y espacios' })
    lastname: string;

    @IsNotEmpty({ message: 'El email es obligatorio' })
    @IsString({ message: 'El email debe ser texto' })
    @IsEmail({}, { message: 'El email no es válido' })
    email: string;

    @IsNotEmpty({ message: 'El teléfono es obligatorio' })
    @IsString({ message: 'El teléfono debe ser texto' })
    @MinLength(10, { message: 'El teléfono debe tener al menos 10 caracteres' })
    @MaxLength(15, { message: 'El teléfono no puede tener más de 15 caracteres' })
    @Matches(/^[0-9]+$/, { message: 'El teléfono solo puede contener números' })
    phone: string;

    @IsNotEmpty({ message: 'La contraseña es obligatoria' })
    @IsString({ message: 'La contraseña debe ser texto' })
    @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
    @MaxLength(30, { message: 'La contraseña no puede tener más de 30 caracteres' })
    password: string;

    @IsOptional()
    @IsString({ message: 'La imagen debe ser texto' })
    image?: string;

    @IsOptional()
    @IsString({ message: 'El token de notificación debe ser texto' })
    notification_token?: string;
}