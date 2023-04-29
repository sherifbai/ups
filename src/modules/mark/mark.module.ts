import { Module } from '@nestjs/common';
import { MarkController } from '@app/modules/mark/mark.controller';
import { MarkService } from '@app/modules/mark/mark.service';

@Module({
  controllers: [MarkController],
  providers: [MarkService],
})
export class MarkModule {}
