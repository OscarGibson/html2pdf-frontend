import { Injectable } from '@angular/core';

@Injectable()
export class UserLogInService {
  private counter: number = 0;
  constructor() {}

  public getUserLogIn():number {
    console.log('get...',this.counter)
    return this.counter
  }
  public setUserLogIn(value:number):void {
    this.counter += value
    console.log('++',this.counter)
  }
}
