import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Res, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { response } from 'express';
import { PasarGuard } from 'src/auth/pasar.guard';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from 'src/auth/guard/local-auth.guard';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { Role } from 'src/auth/models/role.enum';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Public } from 'src/auth/decorator/public.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags("Users")
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Public()
  @Post()
  async create(@Res() response, @Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    return response.status(HttpStatus.OK).json({
      user
    })
  }

  @Roles(Role.Admin)
  @Get()
  async findAll(@Res() response) {
    const user = await this.usersService.findAll();
    return response.status(HttpStatus.OK).json({
      user
    })
  }

  @Get(':id')
  async findOne(@Res() response, @Param('id') id: string) {
    const user = await this.usersService.findByEmail(id);

    return response.status(HttpStatus.OK).json({
      email: user.email
    })
  }

  @Patch(':id')
  async update(@Res() response, @Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.usersService.update(+id, updateUserDto);
    return response.status(HttpStatus.OK).json({
      user
    })
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const user = await this.usersService.delete(id);
    return response.status(HttpStatus.OK).json({
      user
    })
  }
}
