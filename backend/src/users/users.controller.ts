import { Body, Controller, Post, Put, Param, Get } from '@nestjs/common';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { UsersService } from './users.service';


interface LoginDto {
    email: string;
    password: string;
}

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get()
    findAll() {
        return this.usersService.findAll();
    }

    @Get(':id')
    findById(@Param('id') id: string) {
        return this.usersService.findById(Number(id));
    }

    @Post()
    create(@Body() user: CreateUserDto) {
            return this.usersService.create(user);
    }

    @Post('login')
    login(@Body() loginDto: LoginDto) {
        return this.usersService.loginUser(loginDto.email, loginDto.password);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateData: Partial<CreateUserDto>) {
        return this.usersService.updateUser(Number(id), updateData);
    }
}
