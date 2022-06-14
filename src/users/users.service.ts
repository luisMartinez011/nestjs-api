import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

  async create(createUserDto: CreateUserDto) {
    try {
      const newModel = new this.userModel(createUserDto);
      const hashPassword = await bcrypt.hash(newModel.password, 10);
      newModel.password = hashPassword;
      const model = await newModel.save();
      const { password, ...rta } = model.toJSON();
      return rta;
    } catch (err) {
      throw new UnauthorizedException("correo duplicado")
    }

  }

  async findAll(): Promise<User[]> {
    return this.userModel.find({}, { password: 0 }).exec();
  }

  async findByEmail(email: string) {
    return await this.userModel.findOne({ email }).exec();
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    return await this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
  }

  async delete(id: string) {
    const deletedUser = await this.userModel
      .findByIdAndRemove({ _id: id })
      .exec();
    return deletedUser;
  }
}
