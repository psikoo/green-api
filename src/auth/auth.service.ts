import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { HashingProvider } from 'src/hashing/hashing.provider';
import { Repository } from 'typeorm';

import { LoginDto, RegisterDto, UpdateUserDto } from './dto';
import { User } from './entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly hashingProvider: HashingProvider,
    private readonly jwtService: JwtService,
  ) {}

  async login(body: LoginDto) {
    const user: User | null = await this.userRepository.findOneBy({ username: body.username });
    if(user != null) {
      if(await this.hashingProvider.compare(body.password, user.password)) {
        const payload = { username: body.username, role: user.role };
        return {
          jwt: this.jwtService.sign(payload),
          username: user.username,
          role: user.role,
        };
      } else throw new UnauthorizedException('Invalid credentials');
    } else throw new NotFoundException('User not found');
  }

  async register(body: RegisterDto): Promise<User> {
    if(await this.userRepository.findOneBy({ username: body.username }) === null) {
      const hashedPassword = await this.hashingProvider.hash(body.password);
      const user: User = this.userRepository.create({
        username: body.username,
        password: hashedPassword,
        role: body.role,
      });
      return this.userRepository.save(user);
    } else throw new ConflictException('Username already exists');
  }

  async updateUser(id: number, body: UpdateUserDto): Promise<User> {
    const hashedPassword = await this.hashingProvider.hash(body.password);
    const user: User | undefined = await this.userRepository.preload({
      id,
      username: body.username,
      password: hashedPassword,
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
