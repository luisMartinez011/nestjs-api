import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './configuration';

@Module({
  imports: [ProductsModule, DatabaseModule,
    ConfigModule.forRoot({
      isGlobal:true,
      load:[configuration]
    })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
