export interface SectorInterface {
  id?: number;
  sector: string;
  created_at: string;
  is_available: boolean;
}

export interface CategoryInterface {
  id?: number;
  category: string;
  created_at: string;
  is_available: boolean;
}

export type smallCrudsType = 'sector' | 'category';
