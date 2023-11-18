import { forwardRef, Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UserModule } from "../user/user.module";
import { JwtModule } from "@nestjs/jwt";

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [
    forwardRef(() => UserModule),
    JwtModule.register({
      secret: "secret",
      signOptions: {
        expiresIn: "24h",
      },
    }),
  ],
  exports: [AuthService],
})
export class AuthModule {}
