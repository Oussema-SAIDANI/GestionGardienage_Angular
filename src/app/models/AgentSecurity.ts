import { Trajectoire } from './Trajectoire';

export class AgentSecurity {
id: number;
nom: string;
prenom: string;
matricule: number;
cin: number;
adresse: string;
trajectoire: Trajectoire;
// tslint:disable-next-line: max-line-length
// tslint:disable-next-line: variable-name
constructor(id?: number, nom?: string, prenom?: string, matricule?: number, cin?: number, adresse?: string, trajectoire?: Trajectoire) {}
}
