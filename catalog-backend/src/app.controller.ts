import { Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Catalog } from './model/Catalog';
import { Product } from './model/Product';

@Controller('/catalog')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  getAll(): Catalog {
    return this.appService.getAll();
  }

  @Get("/:id")
  getOne(@Param("id") id: string): Product {
    return this.appService.getOne(id);
  }

  @Post("/reload-data")
  reloadData(): void {
    return this.appService.reloadData()
  }
}
