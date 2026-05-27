import { Module } from '@nestjs/common';
import { ActividadesModule } from './actividades/actividades.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [ActividadesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
