import { BaseModel } from 'src/shared/models/BaseModel';
import { Mutuelle } from './../mutuelles/mutuelles.model';
import { Region } from './../regions/region.model';
import { Departement } from './../departements/departement.model';
import { Commune } from './../communes/commune.model';
import { TypeMutuelle } from './../type-mutuelles/type-mutuelles.model';

export interface EnregistrementBeneficiaire extends BaseModel {
  region?: Region;
  departement?: Departement;
  commune?: Commune;
  type?: TypeMutuelle;
  mutuelle: number | Mutuelle;
  date: Date;
  nombre_adherent: string;
  nombre_beneficiaire: string;
  nombre_beneficiaire_a_jour: string;
  dette_etat: string;
}
