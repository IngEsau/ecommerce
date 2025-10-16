import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rol } from './rol.entity';
import { CreateRolDto } from './dto/create-rol.dto';

@Injectable()
export class RolesService {
  constructor(@InjectRepository(Rol) private repo: Repository<Rol>) {}

  create(createRolDto: CreateRolDto) {
    const rol = this.repo.create(createRolDto);
    return this.repo.save(rol);
  }
}