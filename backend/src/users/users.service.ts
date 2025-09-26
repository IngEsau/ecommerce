import { Injectable, ConflictException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from 'src/dto/create-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private UsersReository: Repository<User>,
    ) {}

    create(user: CreateUserDto) {                    
        return this.UsersReository.findOne({ where: { email: user.email } })
            .then(existingUser => {                
                const requiredFields = [
                    { key: 'name', label: 'El nombre es obligatorio' },
                    { key: 'lastname', label: 'El apellido es obligatorio' },
                    { key: 'email', label: 'El email es obligatorio' },
                    { key: 'phone', label: 'El teléfono es obligatorio' },
                    { key: 'password', label: 'La contraseña es obligatoria' }
                ];
                for (const field of requiredFields) {
                    if (!user[field.key] || user[field.key].trim() === '') {
                        throw new BadRequestException(field.label);
                    }
                }
                if (existingUser) {
                    throw new ConflictException('El email ya está registrado');
                }
                if (!/^[0-9]+$/.test(user.phone)) {
                    throw new BadRequestException('El teléfono solo puede contener números');
                }
                if (user.phone.length < 10 || user.phone.length > 15) {
                    throw new BadRequestException('El teléfono debe tener entre 10 y 15 caracteres');
                }
                if (!/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/.test(user.name)) {
                    throw new BadRequestException('El nombre solo puede contener letras');
                }
                if (!/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/.test(user.lastname)) {
                    throw new BadRequestException('El apellido solo puede contener letras');
                }
                if (user.password.length < 6 || user.password.length > 30) {
                    throw new BadRequestException('La contraseña debe tener entre 6 y 30 caracteres');
                }
                const newUser = this.UsersReository.create(user);
                return this.UsersReository.save(newUser);
            });

    }

}
