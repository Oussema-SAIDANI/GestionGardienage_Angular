import { Role } from './Role';

export class User
{

    user_id: Number;
    username : String ;
    password : String ;
    //roles :Role[];
    roles :Role;
    constructor(user_id?:Number,username?:String , password?:String , roles ?:Role){
      //this.roles=new Role[""]() ;
      this.roles=new Role();
    }
}
