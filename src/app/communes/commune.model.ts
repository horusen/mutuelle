import { Departement } from '../departements/departement.model';

export interface Commune {
  id: number;
  libelle: string;
  departement: number | Departement;
}
