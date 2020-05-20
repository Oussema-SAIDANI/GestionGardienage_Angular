import { Beacon } from './Beacon';

export class Emplacement
{
  id:Number;
  latitude:Number;
  longitude:Number;
  nom:string;
  beacon:Beacon;
  constructor(id?:Number,latitude?:Number,longitude?:Number,nom?:string,beacon?:Beacon){}

}
