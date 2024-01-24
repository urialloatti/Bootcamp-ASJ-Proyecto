export interface SectorInterface {
  id?: number;
  sector: string;
  createdAt: string;
  isAvailable: boolean;
}

export interface SmallCrudInterface {
  id?: number;
  name: string;
  createdAt: string;
  isAvailable: boolean;
}

export interface CategoryInterface {
  id?: number;
  category: string;
  created_at: string;
  is_available: boolean;
}

export type smallCrudsType = 'sector' | 'category';
export type Page = 'Categoría' | 'Rubro';
