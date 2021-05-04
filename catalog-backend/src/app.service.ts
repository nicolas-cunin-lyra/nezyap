import { Injectable, Logger } from '@nestjs/common';
import { Catalog } from './model/Catalog';
import { Product } from './model/Product';

@Injectable()
export class AppService {

  private readonly logger = new Logger(AppService.name);

  catalog: Catalog = require("../data/catalog.json")

  getAll(): Catalog {
    this.logger.debug('Getting all the catalog')
    return this.catalog;
  }

  getOne(id: string): Product {
    this.logger.debug('Getting product ' + id)
    return this.catalog.products.find(x => x.id  === id);
  }

  reloadData() {
    this.logger.warn('Reloading Data')
    this.catalog = require("../data/catalog.json")
  }


  //
  // To simulate service down
  //
  breakIt() {
    this.catalog = null
    this.logger.error('Broken')
  }

  fixIt() {
    this.catalog = require("../data/catalog.json")
    this.logger.log('Recovered from broken service')
  }
}
