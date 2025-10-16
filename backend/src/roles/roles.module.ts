import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; 
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { Rol } from './rol.entity'; 

@Module({
  imports: [
    TypeOrmModule.forFeature([Rol]), 
  ],
  controllers: [RolesController],
  providers: [RolesService]
})
export class RolesModule {}