import { DataSource } from 'typeorm';
import { User } from './src/users/user.entity';


const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'dmidecimo25',
  database: 'denadatabase',
  entities: [User],
  synchronize: false,
});

async function deleteInvalidUsers() {
  await AppDataSource.initialize();
  const userRepo = AppDataSource.getRepository(User);  
  const users = await userRepo.find();
  for (const user of users) {
    if (user.password.length < 6) {
      console.log(`Eliminando usuario: ${user.email}`);
      await userRepo.delete(user.id);
    }
  }
  await AppDataSource.destroy();
  console.log('Usuarios inválidos eliminados.');
}

deleteInvalidUsers();
