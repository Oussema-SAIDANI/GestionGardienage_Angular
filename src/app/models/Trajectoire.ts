import { Emplacement } from './Emplacement';

export class Trajectoire
{
  id:Number;
  nom:string;
  emplacements : Array<Emplacement> = [];
  constructor(id?:Number,nom?:string,emplacements?:Emplacement[])

  {

this.emplacements= new Array<Emplacement>();
  }

}
