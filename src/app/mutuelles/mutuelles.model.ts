import { BaseModel } from 'src/shared/models/BaseModel';
import { Commune } from './../communes/commune.model';
import { TypeMutuelle } from './../type-mutuelles/type-mutuelles.model';

export interface Mutuelle extends BaseModel {
  type: TypeMutuelle | number;
  commune: number | Commune;
  libelle: string;
}
