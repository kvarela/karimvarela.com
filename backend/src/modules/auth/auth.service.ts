import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcryptjs'

export interface AuthUser {
  userId: string
  role: string
}

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(username: string, password: string): Promise<AuthUser | null> {
    const adminUsername = this.configService.get<string>('ADMIN_USERNAME')
    const adminPasswordHash = this.configService.get<string>('ADMIN_PASSWORD_HASH')

    if (!adminUsername || !adminPasswordHash) {
      return null
    }

    if (username !== adminUsername) {
      return null
    }

    const isPasswordValid = await bcrypt.compare(password, adminPasswordHash)
    if (!isPasswordValid) {
      return null
    }

    return { userId: 'admin', role: 'admin' }
  }

  login(user: AuthUser): { access_token: string; expires_in: string } {
    const payload = { sub: user.userId, role: user.role }
    const expiresIn = this.configService.get<string>('JWT_EXPIRES_IN', '7d')

    return {
      access_token: this.jwtService.sign(payload),
      expires_in: expiresIn,
    }
  }
}
