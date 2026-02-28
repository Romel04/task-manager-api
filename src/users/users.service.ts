import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository <User>,
    ) {}

    async create(email: string , password: string): Promise<User> {
        const existing = await this.usersRepository.findOne({where: {email}}) ;
        if(existing) throw new ConflictException("Email already in use");

        const hashed = await bcrypt.hash(password , 10) ;
        const user = this.usersRepository.create({email , password: hashed}) ;
        return this.usersRepository.save(user) ;
    }

    async findByEmail(email : string) : Promise<User | null> {
        return this.usersRepository.findOne({where : {email}}) ;
    }
}
