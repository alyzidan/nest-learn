import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  //   @Get(':id')
  //   getAdminName(@Param('id', ParseIntPipe) id: number): number {
  //     console.log(id);
  //     return id;
  //   }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
