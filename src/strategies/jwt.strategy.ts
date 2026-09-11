import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ConfigService } from "node_modules/@nestjs/config/dist/config.service";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "src/auth/entities/users.entity";
import { JwtPayload } from "src/interfaces/jwt-payload.interface";
import { Repository } from "typeorm";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(
        @InjectRepository( User )
        private readonly userRepository: Repository<User>,

        configService: ConfigService
    ) {
        super({
            secretOrKey: configService.get('JWT_SECRET'),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
    }

  async validate(payload: JwtPayload): Promise<User> {

    const { id } = payload;

    const user = await this.userRepository.findOneBy({ id });

    if(!user)
        throw new UnauthorizedException('Token not valid');

    if (!user.isActive)
        throw new UnauthorizedException('User is not active');

    return user;
  }
}