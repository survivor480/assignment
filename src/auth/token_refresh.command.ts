import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class RefreshToken {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'This asks for refresh token',
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyY2VkN2VmOS0zMjFkLTQyMWItYmQyMC00NzFiMThmM2JiN2YiLCJ1c2VybmFtZSI6InN1cnZpdm9yLjQ4IiwiZXhwaXJ5IjoiMjAyNC0wNS0xMFQwODozNzoxNC4xMTJaIiwiaWF0IjoxNzE1MjQzODM0LCJleHAiOjE3MTUzNjM4MzR9.iN_rsHat769m0IRWYPi1dB_Cq1JXN-RWuliohLbwbUQ'
    })
    refresh_token: string
}