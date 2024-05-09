import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UserUpdate {
    @IsString()
    @IsOptional()
    @ApiProperty({
        description: 'This asks for boat_id',
        example: 'uuid'
    })
    boat_id: string

    @IsString()
    @IsOptional()
    @ApiProperty({
        description: 'This asks for jetty_id',
        example: 'uuid'
    })
    jetty_id: string

    @IsString()
    @IsOptional()
    @ApiProperty({
        description: 'This asks for boat_id updated',
        example: 'uuid'
    })
    boat_id_updated: string

    @IsString()
    @IsOptional()
    @ApiProperty({
        description: 'This asks for jetty_id updated',
        example: 'uuid'
    })
    jetty_id_updated: string
}