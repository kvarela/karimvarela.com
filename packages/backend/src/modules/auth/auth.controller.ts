import { Body, Controller, HttpCode, HttpStatus, Post, UnauthorizedException } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { AuthService } from './auth.service'
import { LoginDto } from './dto/login.dto'
import { Public } from '../../common/decorators/public.decorator'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Admin login — returns JWT access token' })
  async login(@Body() loginDto: LoginDto): Promise<{ access_token: string; expires_in: string }> {
    const user = await this.authService.validateUser(loginDto.username, loginDto.password)

    if (!user) {
      throw new UnauthorizedException('Invalid credentials')
    }

    return this.authService.login(user)
  }
}
