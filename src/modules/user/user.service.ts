import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    async findAll(paginationQuery: PaginationQueryDto) {
        const [data, total] = await this.usersRepository.findAndCount({
            skip: paginationQuery.skip,
            take: paginationQuery.limit,
            order: { createdAt: 'DESC' },
        });

        return {
            data,
            meta: {
                total,
                page: paginationQuery.page,
                limit: paginationQuery.limit,
                totalPages: Math.ceil(total / paginationQuery.limit),
            },
        };
    }

    async findOne(id: number): Promise<User> {
        const user = await this.usersRepository.findOne({ where: { id } });
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        return user;
    }

    async create(createUserDto: CreateUserDto): Promise<User> {
        const user = this.usersRepository.create(createUserDto);
        return this.usersRepository.save(user);
    }

    async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
        const user = await this.findOne(id);
        const updatedUser = { ...user, ...updateUserDto };
        await this.usersRepository.save(updatedUser);
        return updatedUser;
    }

    async remove(id: number): Promise<void> {
        const user = await this.findOne(id);
        await this.usersRepository.remove(user);
    }
}