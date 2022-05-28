import { BaseModel } from 'src/shared/models/BaseModel';
import { Mutuelle } from './../mutuelles/mutuelles.model';

export interface EnregistrementCout extends BaseModel {
  date: string;
  mutuelle: number | Mutuelle;
  cas_classique_h: string;
  cas_classique_f: string;
  cas_classique_cout_h: string;
  cas_classique_cout_f: string;
  cas_bsf_h: string;
  cas_bsf_f: string;
  cas_bsf_cout_h: string;
  cas_bsf_cout_f: string;
  cas_cec_h: string;
  cas_cec_f: string;
  cas_cec_cout_h: string;
  cas_cec_cout_f: string;
  cas_eleve_h: string;
  cas_eleve_f: string;
  cas_eleve_cout_h: string;
  cas_eleve_cout_f: string;
  cas_ndongo_daara_h: string;
  cas_ndongo_daara_f: string;
  cas_ndongo_daara_cout_h: string;
  cas_ndongo_daara_cout_f: string;
}
