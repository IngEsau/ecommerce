import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable } from "typeorm";
import { hash } from 'bcrypt';
import { Rol } from "src/roles/rol.entity";
@Entity({ name: 'users' })
export class User {
    //Esto lo genera nest.Js con TypeOrm
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    lastname: string;

    @Column({ unique: true })
    email: string;

    @Column({ unique: true })
    phone: string;

    @Column({ nullable: true })
    image: string;

    @Column()
    password: string;

    @Column({ nullable: true })
    notification_token: string;

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    updated_at: Date;

    @ManyToMany(() => Rol, (rol) => rol.users)
    @JoinTable({ name: 'user_roles' })
    roles: Rol[];

    @BeforeInsert()
    async hashPassword() {
        this.password = await hash(this.password, Number(process.env.HASH_SALT));
    }

}