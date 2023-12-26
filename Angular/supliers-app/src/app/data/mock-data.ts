import { SuplierInterface } from '../interfaces/suplierInterface';
import { ProductInterface } from '../interfaces/productInterface';
import { PurchaseOrderInterface } from '../interfaces/purchaseOrderInterface';

export const suplierMockData: SuplierInterface[] = [
  {
    id: 0,
    brand: 'Monmouth Real Estate Investment Corporation',
    category: 'Medical/Dental Instruments',
    web: 'php.net',
    phone: { country: 83, number: 563332565 },
    fullAddress: {
      address: 'Grasskamp',
      addressNumber: 80668,
      state: 'Texas',
      country: 'United States',
      district: 'Córdoba',
      zipCode: '5000',
    },
    cuit: '27024075187',
    iva: 'IVA Sujeto Exento',
    contact: {
      name: 'Sabina',
      surname: 'Besse',
      phone: { country: 589, number: 62241558 },
      mail: 'sbesse0@oakley.com',
      rol: 'Research and Development',
    },
  },
  {
    id: 1,
    brand: 'BB&T Corporation',
    category: 'Packaged Foods',
    web: 'amazonaws.com',
    phone: { country: 54, number: 3426304069 },
    fullAddress: {
      address: 'Clarendon',
      addressNumber: 92,
      state: 'New Brunswick',
      country: 'Canada',
      district: 'Córdoba',
      zipCode: '5000',
    },
    cuit: '47723688542',
    iva: 'IVA Responsable Inscripto',
    contact: {
      name: 'Walt',
      surname: 'Authers',
      phone: { country: 54, number: 563245896 },
      mail: 'wauthers7@booking.com',
      rol: 'Sales',
    },
  },
];

export const productsMockData: ProductInterface[] = [
  {
    id: 0,
    name: 'Albahaca',
    category: 'Aromáticas',
    description: 'Lorem ipsum dolor sit amet.',
    suplierId: 0,
    suplier: 'Monmouth Real Estate Investment Corporation',
    price: 125,
  },
  {
    id: 1,
    name: 'Manzano',
    category: 'Frutales',
    description: 'Lorem ipsum dolor sit amet.',
    suplierId: 1,
    suplier: 'Arena Pharmaceuticals, Inc.',
    price: 350,
  },
];

export const purchaseOrdersMockData: PurchaseOrderInterface[] = [
  {
    id: 0,
    dateEmited: new Date(),
    dateArriving: new Date(),
    suplierId: 0,
    shippingRequirements: 'Lorem',
    products: [
      {
        productId: 0,
        productQuantity: 2,
      },
      {
        productId: 1,
        productQuantity: 1,
      },
    ],
    total: 600,
    isCanceled: false,
  },
  {
    id: 1,
    dateEmited: new Date(),
    dateArriving: new Date(),
    shippingRequirements: 'lsls',
    suplierId: 1,
    products: [
      {
        productId: 0,
        productQuantity: 1,
      },
      {
        productId: 1,
        productQuantity: 2,
      },
    ],
    total: 500,
    isCanceled: false,
  },
];
