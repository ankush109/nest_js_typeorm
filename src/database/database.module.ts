import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Listing } from 'src/items/entities/Listing.entity';
import { Comment } from 'src/items/entities/comment.enitity';
import { Item } from 'src/items/entities/item.entity';
import { Tag } from 'src/items/entities/tag.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        database: 'prodb',
        username: 'root',
        password: 'ankush',
        synchronize: true,
        entities: [Item, Listing, Comment, Tag],
        logging: true,
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
