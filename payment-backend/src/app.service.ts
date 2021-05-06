import { CACHE_MANAGER, HttpService, Inject, Injectable, Logger } from '@nestjs/common'
import { InjectMetric } from "@willsoto/nestjs-prometheus";
import { Counter } from "prom-client";
import { Transaction } from './model/Transaction'
import { User } from './model/User'
import { Cache } from 'cache-manager'
import { Product } from './model/Product'
import { v4 as uuidv4 } from 'uuid';
import { AxiosResponse } from 'axios'
import { Config } from './config'

@Injectable()
export class AppService {

  private readonly logger = new Logger(AppService.name)

  broken = false

  constructor(
    @Inject(CACHE_MANAGER) 
    private readonly cacheManager: Cache,
    private readonly httpService: HttpService,
    @InjectMetric("nb_transactions") public nbTransactionsCounter: Counter<string>) {}

  async getTransactionsForUser(user: string): Promise<Array<Transaction>> {
    this.logger.debug('Getting all the Transactions for user ' + user)
    const userFound: User = await this.cacheManager.get(`user:${user}`)
    if (userFound != null) return userFound.transactions
    else return []
  }

  async getTransaction(user: string, id: string): Promise<Transaction> {
    this.logger.debug('Getting Transaction ' + id + ' for user ' + user)
    const userFound: User = await this.cacheManager.get(`user:${user}`)
    if (userFound != null) return userFound.transactions.find(x => x.id === id)
    else return null
  }

  async buyProduct(user: string, id: string): Promise<boolean> {

    this.logger.debug('Buying a new product')

    // TODO: handle a list of products (a cart)
    const response: AxiosResponse<Product> = await this.httpService.get(`${Config.CATALOG_BACKEND_URL}/catalog/${id}`).toPromise()
    const product = response.data
    let userFound: User = await this.cacheManager.get(`user:${user}`)

    // user first buy, create its account
    if (userFound == null) {
      userFound = new User()
      userFound.email = user
      userFound.transactions = []
    }

    // create a transaction made of the provided products
    const transaction = new Transaction()
    transaction.date = new Date()
    transaction.id = uuidv4()
    transaction.product = []
    transaction.product.push(product)
    // calculate total amount
    transaction.totalAmount = transaction.product.map(x => x.price).reduce((acc, curr) => acc + curr, 0)
    userFound.transactions.push(transaction)

    // persist it
    this.cacheManager.set(`user:${user}`, userFound, {
      ttl: 3600000
    })

    // custom business metric: nb transaction ++
    this.nbTransactionsCounter.inc()

    return true
  }

  clear(): Promise<void> {
    this.logger.warn('Clearing DB')
    return this.cacheManager.reset()
  }

  breakIt() {
    this.broken = true
    this.logger.error('Broken')
  }

  fixIt() {
    this.broken = false
    this.logger.log('Recovered from broken service')
  }
}
