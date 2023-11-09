import {
  Controller,
  Delete,
  Get,
  NotImplementedException,
  Patch,
  Post,
} from '@nestjs/common';
import { ItemDto } from './Item.dto';

@Controller()
export class ItemController {
  constructor() {}

  @Get()
  async getItem() {
    throw new NotImplementedException();
  }

  @Post()
  async registerItem(itemDto: ItemDto) {
    throw new NotImplementedException();
  }

  @Patch()
  async updateItem() {
    throw new NotImplementedException();
  }

  @Delete()
  async deleteItem() {
    throw new NotImplementedException();
  }
}
