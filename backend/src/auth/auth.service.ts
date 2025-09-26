import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { register } from 'module';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { compare } from 'bcrypt';
//import { jwtConstants } from './jwt.constants';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(@InjectRepository(User) private usersRepository: Repository<User>,
     private jwtService:JwtService)
     { }

    async register(user: RegisterAuthDto) {

        const { email, phone } = user;


        const emailExist = await this.usersRepository.findOneBy({ email: email })//para buscar un campo especifico
        if (emailExist) {//409 CONFLICT
            return new HttpException('El email ya esta registrado', HttpStatus.CONFLICT);
        }

        const phoneExist = await this.usersRepository.findOneBy({ phone: phone })
        if (phoneExist) {
            return new HttpException('El teléfono ya existe', HttpStatus.CONFLICT);
        }
        const newUser = this.usersRepository.create(user);
        return this.usersRepository.save(newUser);

    }
    
    
    async login(loginData: LoginAuthDto) {
//si el email fué encontrado regresame el usuario
        const { email, password } = loginData;
        const userFound = await this.usersRepository.findOneBy({ email: email })
        if (!userFound) {
            return new HttpException('El email no existe', HttpStatus.NOT_FOUND);//404 no encontrado
        }

        const isPasswordValid = await compare(password, userFound.password);
        if (!isPasswordValid)//Si es password no es válido
        {
            return new HttpException('La contraeña es incorrecta', HttpStatus.FORBIDDEN);//403 Phobibido
            // 403 FORBIDDEN o Prohibido o Acceso denegados , no tiene permisos para acceder a cierta información
        }

        const payload={id:userFound.id,name:userFound.name}
        const token=this.jwtService.sign(payload);
        const data={
            user:userFound,
            token: token
        }

        return data;

    } 

}