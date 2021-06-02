import { Injectable, Logger } from '@nestjs/common'
import { Catalog } from './model/Catalog'
import { Product } from './model/Product'
import catalogData from './data/catalog'

@Injectable()
export class AppService {

  private readonly logger = new Logger(AppService.name);

  private catalog: Catalog

  constructor() {
    this.loadData()
  }

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
    this.loadData()
  }

  //
  // To simulate service down
  //
  breakIt() {
    this.clearData()
    this.logger.error('Broken')
  }

  fixIt() {
    this.loadData()
    this.logger.log('Recovered from broken service')
  }

  private loadData() {
    this.catalog = catalogData
  }

  private clearData() {
    this.catalog = null
  }
}
