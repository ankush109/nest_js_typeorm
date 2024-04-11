import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { EntityManager, Repository } from 'typeorm';
import { Item } from './entities/item.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Listing } from './entities/Listing.entity';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private readonly itemsrepo: Repository<Item>,
    private readonly entityManager: EntityManager,
  ) {}
  async create(createItemDto: CreateItemDto) {
    const listing = new Listing({
      ...createItemDto.listing,
      rating: 0,
    });
    const item = new Item({
      ...createItemDto,
      comments: [],
      listing,
    });
    await this.entityManager.save(item);
  }

  async findAll() {
    return await this.itemsrepo.find();
  }

  async findOne(id: number) {
    return this.itemsrepo.findOne({
      where: { id },
      relations: { listing: true, comments: true },
    });
  }

  async update(id: number, updateItemDto: UpdateItemDto) {
    const item = await this.itemsrepo.findOneBy({ id });
    item.public = updateItemDto.public;
    await this.entityManager.save(item);
  }

  async remove(id: number) {
    await this.itemsrepo.delete(id);
  }
}