import { BaseModel } from 'src/shared/models/BaseModel';
import { Commune } from '../communes/commune.model';
import { Departement } from '../departements/departement.model';
import { Region } from '../regions/region.model';
import { TypeMutuelle } from '../type-mutuelles/type-mutuelles.model';
import { Mutuelle } from './../mutuelles/mutuelles.model';

export interface EnregistrementCout extends BaseModel {
  region?: Region;
  departement?: Departement;
  commune?: Commune;
  type?: TypeMutuelle | number;
  date: string;
  mutuelle: number | Mutuelle;
  cas_classique_nombre_h: string;
  cas_classique_nombre_f: string;
  cas_classique_cout_h: string;
  cas_classique_cout_f: string;
  cas_bsf_nombre_h: string;
  cas_bsf_nombre_f: string;
  cas_bsf_cout_h: string;
  cas_bsf_cout_f: string;
  cas_cec_nombre_h: string;
  cas_cec_nombre_f: string;
  cas_cec_cout_h: string;
  cas_cec_cout_f: string;
  cas_eleve_nombre_h: string;
  cas_eleve_nombre_f: string;
  cas_eleve_cout_h: string;
  cas_eleve_cout_f: string;
  cas_ndongo_daara_nombre_h: string;
  cas_ndongo_daara_nombre_f: string;
  cas_ndongo_daara_cout_h: string;
  cas_ndongo_daara_cout_f: string;
}
