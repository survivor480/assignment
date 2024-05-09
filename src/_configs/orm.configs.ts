import { DataSource } from 'typeorm';
import 'dotenv/config';

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: '172.17.0.1',
    port: 5010,
    username: 'postgres',
    password: 'AMS4567',
    database: 'postgres',
    entities: ['dist/**/*.entity.js'],
    logging: true,
    synchronize: true,
    migrationsRun: true,
    // driver: 'postgres',
    // migrations: ['dist/**/migrations/*.js'],
    migrations: ['dist/**/migrations/*.js'],
    migrationsTableName: 'history'
})

AppDataSource
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    })