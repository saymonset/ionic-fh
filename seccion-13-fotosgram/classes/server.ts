import Express from 'express';


export  default class Server {
  public app: Express.Application;
  public port: number = 3000;

  constructor () {
      this.app = Express();
  }


  start(callback: any){
    //server.listen(3000,"0.0.0.0");
          this.app.listen( this.port,"0.0.0.0", callback);
  }

}