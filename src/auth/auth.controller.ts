import { Controller, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { Role } from 'src/constants';

import { AuthService } from './auth.service';
import { LoginDto, RegisterDto, UpdateUserDto } from './dto';
import { Public } from './passport/decorators/public.decorator';
import { Roles } from './passport/decorators/roles.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('register')
  @Roles(Role.ADMIN)
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Patch('update/:id')
  @Roles(Role.ADMIN, Role.MANAGER)
  async updateUser(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.authService.updateUser(id, updateUserDto);
  }

  @Delete('delete/:id')
  @Roles(Role.ADMIN)
  async deleteUser(@Param('id') id: number) {
    return this.authService.deleteUser(id);
  }
}
