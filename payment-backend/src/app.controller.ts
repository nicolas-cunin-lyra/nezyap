import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Transaction } from './model/Transaction';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("/users/:user/transactions")
  getTransactionsForUser(@Param("user") user: string): Promise<Array<Transaction>> {
    return this.appService.getTransactionsForUser(user);
  }

  @Get("/users/:user/transactions/:id")
  getTransaction(@Param("user") user: string, @Param("id") id: string): Promise<Transaction> {
    return this.appService.getTransaction(user, id);
  }

  @Post("/users/:user/transactions/:id")
  buyProduct(@Param("user") user: string, @Param("id") id: string): Promise<boolean> {
    return this.appService.buyProduct(user, id);
  }

  @Delete("/users")
  clear(): Promise<void> {
    return this.appService.clear()
  }
}
