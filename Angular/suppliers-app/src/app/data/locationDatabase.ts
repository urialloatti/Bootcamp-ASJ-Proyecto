interface location {
  country: string;
  provinces: string[];
}

export const locationDB: location[] = [
  {
    country: 'Argentina',
    provinces: [
      'Buenos Aires',
      'Córdoba',
      'Entre Ríos',
      'La Pampa',
      'Mendoza',
      'Neuquén',
      'San Juan',
      'Santa Cruz',
      'Santa Fe',
    ],
  },
  {
    country: 'Chile',
    provinces: ['Coquimbo', 'Maule', 'Santiago', 'Valparaíso'],
  },
  {
    country: 'Brasil',
    provinces: ['São Paulo', 'Mato Grosso', 'Río Grande del Sur'],
  },
  {
    country: 'Paraguay',
    provinces: ['Distrito Capital', 'Alto Paraguay', 'Alto Paraná'],
  },
  {
    country: 'Uruguay',
    provinces: ['Montevideo', 'Salto', 'Paysandú', 'Maldonado'],
  },
];

export const phoneCountryCodes = [
  { country: 'AR', code: 54 },
  { country: 'BR', code: 55 },
  { country: 'CL', code: 56 },
  { country: 'PY', code: 595 },
  { country: 'UY', code: 598 },
];
