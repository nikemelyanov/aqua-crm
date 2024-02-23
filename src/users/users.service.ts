import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  // async create(createUserDto: CreateUserDto): Promise<User> {
  //   return this.prisma.user.create({ data: createUserDto });
  // }

  // async findAll(): Promise<User[]> {
  //   return this.prisma.user.findMany();
  // }

  async findOne(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  // async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
  //   return this.prisma.user.update({ where: { id }, data: updateUserDto });
  // }

  // async remove(id: number): Promise<User> {
  //   return this.prisma.user.delete({ where: { id } });
  // }
}
