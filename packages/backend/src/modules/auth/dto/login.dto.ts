import { IsString, IsNotEmpty, MinLength } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class LoginDto {
  @ApiProperty({ example: 'karim' })
  @IsString()
  @IsNotEmpty()
  username!: string

  @ApiProperty({ example: 'supersecret' })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password!: string
}
