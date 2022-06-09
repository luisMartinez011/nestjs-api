import { Global, Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import configuration from 'src/configuration';

@Global()
@Module({
    imports:[MongooseModule.forRootAsync({
        useFactory: async (configService: ConfigType<typeof configuration>) => {
          const {
            user,
            password,
            host,
            port,
            connection
          }= configService.mongo; 
          console.log(configService.mongo)
          return {
            uri: `${connection}://${user}:${password}@${host}:${port}/?authMechanism=DEFAULT`
          }
        },
        inject: [configuration.KEY],
      })
      ]
})
export class DatabaseModule {}
