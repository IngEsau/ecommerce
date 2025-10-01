import { Controller, Post, Body } from "@nestjs/common";
import { RegisterAuthDto } from "./dto/register-auth.dto";
import { LoginAuthDto } from "./dto/login-auth.dto";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post("register")
    register(@Body() user: RegisterAuthDto) {
        return this.authService.register(user);
    }

    @Post("login")
    login(@Body() loginData: LoginAuthDto) {
        return this.authService.login(loginData);
    }
}   