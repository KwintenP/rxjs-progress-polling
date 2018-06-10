import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProgressController } from './progress/progress.controller';

@Module({
  imports: [],
  controllers: [AppController, ProgressController],
  providers: [AppService]
})
export class AppModule {}
