import {
    Entity, 
    PrimaryGeneratedColumn, 
    Column,
    Unique,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany
} from "typeorm";
import { Usuario } from "./User";

@Entity()
@Unique(["perfil", "codigo"])
export class Perfil {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    perfil: string;

    @Column()
    codigo: string;

    @Column()
    @CreateDateColumn()
    createAt: Date;

    @Column()
    @UpdateDateColumn()
    updateAt: Date;

    @OneToMany( () => Usuario, user => user.perfil)
    usuarios: Usuario[];
}
