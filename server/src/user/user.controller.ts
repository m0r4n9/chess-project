import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UserController {
    constructor(private userService: UserService) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    getAll() {
        return this.userService.getAllUsers();
    }

    @Get(":id")
    getUserById(@Param() params: {id: string}): Promise<any> {
        return this.userService.getUserById(params.id);
    }
}
