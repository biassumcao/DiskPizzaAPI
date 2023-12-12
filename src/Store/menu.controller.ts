import { Controller, Get } from '@nestjs/common';
import { MenuService } from './menu.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Menu')
@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @ApiOperation({
    summary: 'Consult menu',
    description: 'Consult menu',
  })
  @Get()
  async getMenu() {
    return await this.menuService.getMenu();
  }
}
