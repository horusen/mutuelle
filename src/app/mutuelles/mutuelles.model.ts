import { BaseModel } from 'src/shared/models/BaseModel';
import { Commune } from './../communes/commune.model';
import { TypeMutuelle } from './../type-mutuelles/type-mutuelles.model';
import { Region } from './../regions/region.model';
import { Departement } from './../departements/departement.model';

export interface Mutuelle extends BaseModel {
  region?: Region;
  departement?: Departement;
  type: TypeMutuelle | number;
  commune: number | Commune;
  libelle: string;
}
