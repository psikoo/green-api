import * as bcrypt from 'bcrypt';
import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';

import { User } from './entities/user.entity';
import { LoginDto, RegisterDto, UpdateUserDto } from './dto';

@Injectable()
export class AuthService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>, private jwtService: JwtService) {}

  async login(body: LoginDto) {
    const user: User | null = await this.userRepository.findOneBy({ username: body.username });
    if(user != null) {
      if(await bcrypt.compare(body.password, user.password)) {
        const payload = { username: body.username, role: user.role };
        return { jwt: this.jwtService.sign(payload) };
      } else throw new UnauthorizedException('Invalid credentials');
    } else throw new NotFoundException('User not found');
  }

  async register(body: RegisterDto): Promise<User> {
    if(await this.userRepository.findOneBy({ username: body.username }) === null) {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(body.password, salt);
      const user: User = this.userRepository.create({
        username: body.username,
        password: hashedPassword,
        role: body.role,
      });
      return this.userRepository.save(user);
    } else throw new ConflictException('Username already exists');
  }

  async updateUser(id: number, body: UpdateUserDto): Promise<User> {
    const user: User | undefined = await this.userRepository.preload({
      username: body.username,
      password: body.password,
      role: body.role,
    });
    if(!user) throw new NotFoundException('Resource not found');
    else return this.userRepository.save(user);
  }

  async deleteUser(id: number): Promise<User> {
    const user: User | null = await this.userRepository.findOneBy({ id });
    if(!user) throw new NotFoundException('Resource not found');
    else return this.userRepository.remove(user);
  }
}
