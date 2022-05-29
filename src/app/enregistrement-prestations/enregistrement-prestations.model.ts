import { BaseModel } from 'src/shared/models/BaseModel';
import { Commune } from '../communes/commune.model';
import { Departement } from '../departements/departement.model';
import { Mutuelle } from '../mutuelles/mutuelles.model';
import { Region } from '../regions/region.model';
import { TypePrestation } from './../type-prestations/type-prestations.model';
import { TypeMutuelle } from './../type-mutuelles/type-mutuelles.model';

export interface EnregistrementPrestation extends BaseModel {
  region?: Region;
  departement?: Departement;
  commune?: Commune;
  type?: TypeMutuelle | number;
  date: string;
  mutuelle: number | Mutuelle;
  cas_classique_nombre_h: string;
  cas_classique_nombre_f: string;
  cas_bsf_nombre_h: string;
  cas_bsf_nombre_f: string;
  cas_cec_nombre_h: string;
  cas_cec_nombre_f: string;
  cas_eleve_nombre_h: string;
  cas_eleve_nombre_f: string;
  cas_ndongo_daara_nombre_h: string;
  cas_ndongo_daara_nombre_f: string;
  type_prestation: TypePrestation | number;
}
