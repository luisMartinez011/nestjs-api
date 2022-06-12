import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {

    @ApiProperty()
    @IsEmail()
    readonly email: string

    @ApiProperty()
    @IsString()
    @MinLength(8)
    @MaxLength(12)
    readonly password: string;
}
