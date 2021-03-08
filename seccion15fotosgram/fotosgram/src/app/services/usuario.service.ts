import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Usuario } from '../pages/interfaces/interfaces';

import { NavController } from '@ionic/angular';



const URL = environment.url;



@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  token: string = null;
  private usuario: Usuario = {};


  constructor(private httpClient:HttpClient,private storage: Storage,
    private navController:NavController) { }


   getUsuario(){
    
    if (!this.usuario._id){
      this.validaToken();
    }

    return {...this.usuario}
   }

  login (email: string, password: string){
     const data = {email, password}

     return new Promise( (resolve,reject) =>{

          this.httpClient.post(`${ URL }/user/login`, data)
          .subscribe(resp=>{
            console.log(resp);
    
            if (resp['ok']){
              this.guardarToken(resp['token']);
              resolve(true);
            }else{
              this.token = null;
              this.storage.clear();
              resolve(false);
            }
          });

     });

     
  }
  
  async guardarToken(token: string){
           this.token  = token;
        await   this.storage.set('token',token);
  }


  registro(usuario: Usuario){

      return new Promise((resolve,reject)=>{
            //localhost:3000/user/create
             this.httpClient.post<Usuario>(`${ URL }/user/create`, usuario)
             .subscribe(resp=>{
               
                      if (resp['ok']){
                        this.guardarToken(resp['token']);
                        resolve(true);
                      }else{
                        this.token = null;
                        this.storage.clear();
                        resolve(false);
                      }

             });
      });
  }
 
   async cargarToken(){
    this.token = await this.storage.get('token') || null;
  }

 async  validaToken():Promise<boolean>{
    
    await this.cargarToken();

    if (!this.token){
       this.navController.navigateRoot('/login');
       return Promise.resolve(false);
    }


    return new Promise<boolean>((resolve,reject)=>{

      const headers = new HttpHeaders({
        'x-token': this.token
      });

      this.httpClient.get<Usuario>(`${ URL }/user/`,{ headers })
      .subscribe(resp=>{
              if (resp['ok']){
                    this.usuario = resp['usuario'];
                    resolve(true);
              }else{
                    this.navController.navigateRoot('/login');
                    resolve(false);
              }
      });
     });
  }

  actualizarUsuario(usuario: Usuario):Promise<boolean>{

    return new Promise<boolean>((resolve, reject)=>{

      const headers = new HttpHeaders({
        'x-token':this.token
      });
  
      console.log(usuario)
      this.httpClient.post<Usuario>(`${ URL }/user/update`, usuario, {headers})
      .subscribe(resp=>{
        if (resp['ok']){
          this.guardarToken(resp['token']);
          resolve(true);
        }else{
          resolve(false); 
        }
      });
    });
    
  }

}
