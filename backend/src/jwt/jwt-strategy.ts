import { Injectable } from '@nestjs/common';
import { PassportStrategy } from "@nestjs/passport";
//import { Strategy } from "passport-local";
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from './jwt.constants';
//import { jwtConstants } from './jwt.constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
constructor(){
    super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration:false,
        secretOrKey:jwtConstants.secret,
    });
}
//El parámetro payload representa el contenido decodificado del JWT
// , es decir, los datos que estaban dentro del token.
async validate(payload:any){
    return {userId:payload.id, username:payload.name,roles:payload.roles};
}
}