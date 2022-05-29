import { BaseModel } from 'src/shared/models/BaseModel';
import { Mutuelle } from '../mutuelles/mutuelles.model';
import { TypePrestation } from './../type-prestations/type-prestations.model';

export interface EnregistrementPrestation extends BaseModel {
  date: string;
  mutuelle: number | Mutuelle;
  cas_classique_h: string;
  cas_classique_f: string;
  cas_bsf_h: string;
  cas_bsf_f: string;
  cas_cec_h: string;
  cas_cec_f: string;
  cas_eleve_h: string;
  cas_eleve_f: string;
  cas_ndongo_daara_h: string;
  cas_ndongo_daara_f: string;
  type_prestation: TypePrestation | number;
}
