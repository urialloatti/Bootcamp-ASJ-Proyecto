import { SuplierInterface } from '../interfaces/suplierInterface';
import { ProductInterface } from '../interfaces/productInterface';
import { PurchaseOrderInterface } from '../interfaces/purchaseOrderInterface';

export const suplierMockData: SuplierInterface[] = [
  {
    id: 0,
    code: 'Tec0',
    brand: 'Fravega SA',
    sector: 'Tecnología',
    cuit: '30526874249',
    iva: 'IVA Responsable Inscripto',
    phone: { country: 54, number: 800322156521 },
    web: 'fravega.com',
    fullAddress: {
      address: '9 de Julio',
      addressNumber: 57,
      country: 'Argentina',
      district: 'Córdoba',
      city: 'Córdoba',
      zipCode: '5000',
    },
    contact: {
      name: 'Jorge',
      surname: 'Amparo',
      mail: 'jamparo@fravega.com',
      phone: { country: 54, number: 3516305067 },
      rol: 'Encargado de compras',
    },
  },
  {
    id: 1,
    code: 'Tec1',
    brand: 'Cetrogar',
    sector: 'Tecnología',
    cuit: '30592845748',
    iva: 'IVA Responsable Inscripto',
    phone: { country: 54, number: 800322663597 },
    web: 'cetrogar.com',
    fullAddress: {
      address: 'Rivera Indarte',
      addressNumber: 171,
      country: 'Argentina',
      district: 'Córdoba',
      city: 'Córdoba',
      zipCode: '5000',
    },
    contact: {
      name: 'Ana Clara',
      surname: 'Suarez',
      mail: 'asuarez@cetrogar.com',
      phone: { country: 54, number: 3516523678 },
      rol: 'Encargado de compras',
    },
  },
];

export const productsMockData: ProductInterface[] = [
  {
    id: 0,
    code: '8a9110db-94bf-4446-ae80-21f0ba9c1cbe',
    name: 'Samsung Galaxy A54',
    suplierId: 0,
    suplier: 'Fravega SA',
    category: 'Celulares',
    price: 939999,
    description:
      'Android | 50 MP / 4K | Octa-Core 2.4, 2.0 GHZ | 8 GB RAM | 256 GB ALMACENAMIENTO | 6.4" | Super AMOLED | IP67 INSPIRADO EN LA SIMPLEZA Con un acabado premium en cristal, un módulo de cámara con un diseño elegante y colores que transmiten energía, el Galaxy A54 5G lleva inscrita su identidad Awesome en su aspecto elegante y minimalista.',
  },
  {
    id: 1,
    code: '1f83a21e-f48c-45b0-95f4-afacf1c1047b',
    name: 'Notebook HP 15.6” Ryzen 5',
    suplierId: 0,
    suplier: 'Fravega SA',
    category: 'Laptops',
    price: 1299999,
    description:
      'Está equipada con un procesador AMD Ryzen 5, que ofrece un rendimiento potente y eficaz, capaz de manejar tareas exigentes y ejecutar aplicaciones de manera fluida. Además, cuenta con 8GB de RAM, lo que permite una multitarea eficiente y una respuesta rápida del sistema. La SSD de 256GB proporciona un almacenamiento rápido y amplio para todos tus archivos',
  },
  {
    id: 2,
    code: '4a9110db-94bf-4446-ae80-21f0bF9c1cbe',
    name: 'Samsung Galaxy S23',
    suplierId: 1,
    suplier: 'Cetrogar',
    category: 'Celulares',
    price: 939999,
    description:
      'Android | 50 MP / 4K | Octa-Core 2.4, 2.0 GHZ | 8 GB RAM | 256 GB ALMACENAMIENTO | 6.4" | Super AMOLED | IP67 INSPIRADO EN LA SIMPLEZA Con un acabado premium en cristal, un módulo de cámara con un diseño elegante y colores que transmiten energía, el Galaxy A54 5G lleva inscrita su identidad Awesome en su aspecto elegante y minimalista.',
  },
  {
    id: 3,
    code: '2f83a21e-f4Ac-45b0-95f4-afacf1c1047b',
    name: 'Notebook Dell 15.6” Intell I7',
    suplier: 'Cetrogar',
    suplierId: 1,
    category: 'Laptops',
    price: 1299999,
    description:
      'Está equipada con un procesador Intell I 7, que ofrece un rendimiento potente y eficaz, capaz de manejar tareas exigentes y ejecutar aplicaciones de manera fluida. Además, cuenta con 8GB de RAM, lo que permite una multitarea eficiente y una respuesta rápida del sistema. La SSD de 256GB proporciona un almacenamiento rápido y amplio para todos tus archivos',
  },
];

export const purchaseOrdersMockData: PurchaseOrderInterface[] = [
  {
    id: 0,
    suplierId: 0,
    suplierName: 'Fravega SA',
    dateEmited: '2023-12-26',
    dateArriving: '2024-01-02',
    shippingRequirements: 'Llamar al arribar',
    total: 5779995,
    products: [
      {
        productId: 0,
        productName: 'Samsung Galaxy A54',
        price: 939999,
        productQuantity: 2,
      },
      {
        productId: 1,
        productName: 'Notebook HP 15.6” Ryzen 5',
        price: 1299999,
        productQuantity: 3,
      },
    ],
    isAvailable: false,
  },
  {
    id: 2,
    suplierId: 1,
    suplierName: 'Cetrogar SA',
    dateEmited: '2023-12-26',
    dateArriving: '2024-01-05',
    shippingRequirements: '-',
    total: 6139995,
    products: [
      {
        productId: 2,
        productName: 'Samsung Galaxy S23',
        price: 939999,
        productQuantity: 1,
      },
      {
        productId: 3,
        productName: 'Notebook Dell 15.6” Intell I7',
        price: 1299999,
        productQuantity: 4,
      },
    ],
    isAvailable: false,
  },
];
