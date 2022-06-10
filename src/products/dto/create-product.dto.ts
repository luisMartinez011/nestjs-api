import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString, IsUrl } from "class-validator";

export class CreateProductDto {

    @ApiProperty({
        description: "Product´s name"
    })
    @IsString()
    readonly name: string;

    @ApiProperty()
    @IsUrl()
    readonly image: string;

    @ApiProperty({
        type: Number
    })
    @IsInt()
    readonly price: number;

    @ApiProperty()
    @IsString()
    readonly description: string;
}
