import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { register } from 'module';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { compare, hash } from 'bcrypt';
//import { jwtConstants } from './jwt.constants';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(@InjectRepository(User) private usersRepository: Repository<User>,
     private jwtService:JwtService)
     { }

    async register(user: RegisterAuthDto) {
        const { email, phone, password } = user;
        const emailExist = await this.usersRepository.findOneBy({ email: email });
        if (emailExist) {
            return new HttpException('El email ya esta registrado', HttpStatus.CONFLICT);
        }
        const phoneExist = await this.usersRepository.findOneBy({ phone: phone });
        if (phoneExist) {
            return new HttpException('El teléfono ya existe', HttpStatus.CONFLICT);
        }
        // Hash de contraseña antes de guardar
        const hashedPassword = await hash(password, Number(process.env.HASH_SALT) || 10);
        const newUser = this.usersRepository.create({ ...user, password: hashedPassword });
        return this.usersRepository.save(newUser);
    }
    
    
    async login(loginData: LoginAuthDto) {
        //si el email fué encontrado regresame el usuario
        const { email, password } = loginData;
        const userFound = await this.usersRepository.findOneBy({ email: email });
        if (!userFound) {
            throw new HttpException('El email no existe', HttpStatus.NOT_FOUND);//404 no encontrado
        }

        const isPasswordValid = await compare(password, userFound.password);
        if (!isPasswordValid) {
            throw new HttpException('La contraseña es incorrecta', HttpStatus.FORBIDDEN);//403 Prohibido
        }

        const payload = { id: userFound.id, name: userFound.name };
        const token = this.jwtService.sign(payload);
        const data = {
            user: userFound,
            token: token
        };

        return data;
    }

}