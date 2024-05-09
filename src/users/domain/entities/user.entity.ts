import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class TestUser {
    @PrimaryGeneratedColumn('uuid')
    user_id: string;

    @Column()
    user_name: string;

    @Column()
    password: string;

    @Column({ name: 'delete_flag', default: false })
    delete_flag: boolean;

    @Column({name: 'delete_date', nullable: true})
    delete_date: Date

    @Column({ name: 'created_date', default: () => 'CURRENT_TIMESTAMP' })
    created_date: Date;

    @Column({ name: 'updated_date', default: null})
    updated_date: Date;

    constructor(user_name:string, password:string){
        this.user_name = user_name;
        this.password = password;
    }
}
