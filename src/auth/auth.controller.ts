import { Body, Controller, Post, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserCreate } from './user_create.command';
import { FinalResponse } from 'src/_interceptors/response-wrapper.interceptor';
import { UserLogin } from './user_login.command';
import { RefreshToken } from './token_refresh.command';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('signup')
    @ApiResponse({
        description: 'User Creation Successful',
        status: 200
    })
    @ApiResponse({
        description: 'User Creation Failed',
        status: 400
    })
    async create(@Body() user_details: UserCreate){
        try {
            let user_instance = await this.authService.create(user_details);
            
            // Show the details of the user created in case of development environment
            if(process.env.environment === 'development') return new FinalResponse(user_instance, "success", 200, "User Creation Successful");

            return new FinalResponse({}, "success", 200, "User Creation Successful");
        } catch(err){
            console.error(err);

            if(err.error !== undefined){
                return new FinalResponse({}, "failed", 400, err.error);
            }

            return new FinalResponse({}, "failed", 500, "Internal Server Error");
        }
    }


    @Post('login')
    @ApiResponse({
        description: 'User Login Successful',
        status: 200
    })
    @ApiResponse({
        description: 'Failed to Login User',
        status: 400
    })
    @ApiOperation({summary: 'This logs in the user'})
    async login(@Body() user_details: UserLogin) {
        try {
            // Generate an access token that will expire in 15 minutes
            const access_token:string = await this.authService.signIn(user_details.user_name, user_details.password);

            // Generating a refresh token that will remain active for an entire day and will be needed to generate a new token
            const refresh_token:string = await this.authService.signIn(user_details.user_name, user_details.password, 1440);

            return new FinalResponse({ access_token: `Bearer ${access_token}`, refresh_token: `Bearer ${refresh_token}`}, "success", 200, "User Login Successful")
        } catch(err){
            console.error(err);

            if(err.error !== undefined){
                return new FinalResponse({}, "failed", 400, err.error);
            }

            return new FinalResponse({}, "failed", 500, "Internal Server Error");
        }
    }

    @Post('refresh')
    @ApiResponse({
        description: 'Token Refreshed',
        status: 200
    })
    @ApiResponse({
        description: 'Failed to refresh token',
        status: 400
    })
    @ApiOperation({summary: 'Token Refresh API'})
    async refreshToken(@Body() refresh_token: RefreshToken) {
        try {
            // Decode the passed in access token
            const decoded_token:{sub: string, username: string, expiry: Date} = await this.authService.decode(refresh_token.refresh_token);

            const current_date = new Date();

            // Check if the refresh token is expired or not
            if(current_date > decoded_token.expiry) return new FinalResponse({}, "failed", 406, "Refresh Token Expired. Please Login Again");

            // Create an access token that will expire in 15 minutes
            const access_token = await this.authService.createToken(decoded_token.sub, decoded_token.username);

            return new FinalResponse({access_token: `Bearer ${access_token}`}, "success", 200, "Access Token Refreshed")
        } catch(err){
            console.error(err);

            if(err.error !== undefined){
                return new FinalResponse({}, "failed", 400, err.error);
            }

            return new FinalResponse({}, "failed", 500, "Internal Server Error");
        }
    }
}