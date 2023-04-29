import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { appConfig, dbConfig } from '@app/common/config/configuration';
import { PrismaModule } from '@app/prisma/prisma.module';
import { UserModule } from '@app/modules/user/user.module';
import { AppController } from '@app/app.controller';
import { AppService } from '@app/app.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from '@app/common/config/jwt.config';
import { AuthModule } from '@app/modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, dbConfig],
    }),
    JwtModule.register(jwtConfig),
    PrismaModule,
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
