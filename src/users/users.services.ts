import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

interface CreateUser {
    email: string;
    firstName: string;
    lastName: string;
}

interface UpdateUser {
    email?: string;
    firstName?: string;
    lastName?: string;
}


@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    async findAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    async create(user: CreateUser): Promise<string> {
        try {
            const userData = { ...user };
            // check by email
            const emailExist = await this.getUserByEmail(user.email);

            if (emailExist) {
                throw new BadRequestException('email must be unique');
            }
            await this.userRepository.save(userData);
            return 'user is created!'
        } catch (e) {
            throw new BadRequestException(e.message);
        }
    }

    async getUserByEmail(email: string): Promise<User> {
        return await this.userRepository.findOne({ where: { email } });
    }

    async update(id: number, userData: UpdateUser): Promise<string> {
        try {
            const idExist = await this.userRepository.findOne(id);

            if (!idExist) {
                throw new BadRequestException('not found id');
            }
            await this.userRepository.update(id, userData)
            return 'user is created!'
        } catch (e) {
            throw new BadRequestException(e.message);
        }
    }

    async deleteUser(id: number): Promise<string> {
        try {
            await this.userRepository.delete(id);
            return 'delete user successfully!'
        } catch (e) {
            throw new BadRequestException(e.message);
        }
    }
}