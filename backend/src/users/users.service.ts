import { Injectable, ConflictException, BadRequestException, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { compare, hash } from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private UsersReository: Repository<User>,
    ) {}

    async findAll() {
        return this.UsersReository.find();
    }

    async findById(id: number) {
        const user = await this.UsersReository.findOne({ where: { id } });
        if (!user) {
            throw new NotFoundException('Usuario no encontrado');
        }
        return user;
    }

    async create(user: CreateUserDto) {
        // Validaciones básicas (puedes delegar a DTOs con class-validator)
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
        const existingUser = await this.UsersReository.findOne({ where: { email: user.email } });
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
        // Hash de contraseña
        const hashedPassword = await hash(user.password, Number(process.env.HASH_SALT) || 10);
        const newUser = this.UsersReository.create({ ...user, password: hashedPassword });
        return this.UsersReository.save(newUser);
    }

    async loginUser(email: string, password: string) {
        const user = await this.UsersReository.findOne({ where: { email } });
        if (!user) {
            throw new NotFoundException('El email no existe');
        }
        const isPasswordValid = await compare(password, user.password);
        if (!isPasswordValid) {
            throw new ForbiddenException('La contraseña es incorrecta');
        }
        // Aquí podrías retornar un JWT si tienes AuthService, o solo el usuario
        return user;
    }

    async updateUser(id: number, updateData: Partial<CreateUserDto>) {
        const user = await this.UsersReository.findOne({ where: { id } });
        if (!user) {
            throw new NotFoundException('Usuario no encontrado');
        }
        // Si se actualiza la contraseña, hashearla
        if (updateData.password) {
            updateData.password = await hash(updateData.password, Number(process.env.HASH_SALT) || 10);
        }
        Object.assign(user, updateData);
    return this.UsersReository.save(user);
    }
}
