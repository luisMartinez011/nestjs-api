import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";
import { Role } from "src/auth/models/role.enum";

export class CreateUserDto {

    @ApiProperty()
    @IsEmail()
    readonly email: string;

    @ApiProperty()
    @IsString()
    @MinLength(8)
    @MaxLength(12)
    readonly password: string;

    @ApiProperty()
    @IsString()
    readonly role: string;
}
