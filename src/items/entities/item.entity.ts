import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Listing } from './Listing.entity';
import { Comment } from './comment.enitity';
import { AbstractEntity } from 'src/database/abstract.entity';
import { Tag } from './tag.entity';

@Entity()
export class Item extends AbstractEntity<Item> {
  @Column()
  name: string;
  @Column({ default: true })
  public: boolean;
  @OneToMany(() => Comment, (comment) => comment.item, { cascade: true })
  comments: Comment[];
  @OneToOne(() => Listing, { cascade: true })
  @JoinColumn()
  listing: Listing;
  @ManyToMany(() => Tag, { cascade: true })
  @JoinTable()
  tags: Tag[];
}
