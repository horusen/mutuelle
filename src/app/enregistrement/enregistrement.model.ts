import { BaseModel } from 'src/shared/models/BaseModel';
import { Mutuelle } from './../mutuelles/mutuelles.model';
import { Region } from './../regions/region.model';
import { Departement } from './../departements/departement.model';
import { Commune } from './../communes/commune.model';

export interface Enregistrement extends BaseModel {
  date: string;
  mutuelle: number | Mutuelle;
  region?: Region;
  departement?: Departement;
  Commune?: Commune;
}
