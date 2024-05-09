import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class UserLogin {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'This asks for the username',
        example: 'admin'
    })
    user_name: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'This asks for the password',
        example: 'password123'
    })
    password: string
}