import { Region } from '../regions/region.model';

export interface Departement {
  id: number;
  libelle: string;
  region: number | Region;
}
