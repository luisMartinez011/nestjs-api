import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { response } from 'express';

@ApiTags("Users")
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  async create(@Res() response, @Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    return response.status(HttpStatus.OK).json({
      user
    })
  }

  @Get()
  async findAll(@Res() response) {
    const user = await this.usersService.findAll();
    return response.status(HttpStatus.OK).json({
      user
    })
  }

  @Get(':id')
  async findOne(@Res() response, @Param('id') id: string) {
    const user = await this.usersService.findOne(+id);;
    return response.status(HttpStatus.OK).json({
      user
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
