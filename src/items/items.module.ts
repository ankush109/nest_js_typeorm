import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { Listing } from './entities/Listing.entity';
import { Comment } from './entities/comment.enitity';
import { Tag } from './entities/tag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Listing, Item, Comment, Tag])],
  controllers: [ItemsController],
  providers: [ItemsService],
})
export class ItemsModule {}
