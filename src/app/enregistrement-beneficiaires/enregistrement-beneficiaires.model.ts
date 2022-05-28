import { BaseModel } from 'src/shared/models/BaseModel';
import { Mutuelle } from './../mutuelles/mutuelles.model';

export interface EnregistrementBeneficiaire extends BaseModel {
  mutuelle: number | Mutuelle;
  nombre_adherent: string;
  nombre_beneficiaire: string;
  nombre_beneficiaire_a_jour: string;
  dette_etat: string;
}
