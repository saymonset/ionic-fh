import Express from 'express';


export  default class Server {
  public app: Express.Application;
  public port: number = 3000;

  constructor () {
      this.app = Express();
  }


  start(callback: any){
          this.app.listen( this.port, callback);
  }

}