import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { appConfig, dbConfig } from '@app/common/config/configuration';
import { PrismaModule } from '@app/prisma/prisma.module';
import { UserModule } from '@app/modules/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from '@app/common/config/jwt.config';
import { AuthModule } from '@app/modules/auth/auth.module';
import { PostModule } from '@app/modules/post/post.module';
import { MarkModule } from '@app/modules/mark/mark.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, dbConfig],
    }),
    JwtModule.register(jwtConfig),
    PrismaModule,
    AuthModule,
    PostModule,
    UserModule,
    MarkModule,
  ],
})
export class AppModule {}
