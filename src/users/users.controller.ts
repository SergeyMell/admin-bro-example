import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common"
import { CreateUserDto, UpdateUserDto } from "./dto/create-user.dto";
import { User } from "./entities/user.entity";
import { UsersService } from "./users.services"

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get()
    async getUsers(): Promise<User[]> {
        return this.usersService.findAll();
    }

    @Post()
    async createUsers(@Body() data: CreateUserDto): Promise<string> {
        return this.usersService.create(data);
    }

    @Patch(':id')
    async updateUser(@Body() data: UpdateUserDto, @Param('id') id: number): Promise<any> {
        return this.usersService.update(id, data)
    }

    @Delete(':id')
    async deleteUser(@Param('id') id: number): Promise<string> {
        return this.usersService.deleteUser(id);
    }
}