import { Order } from "../interfaces/orders.interface";

export const ORDERS_MOCK: Order[] = [
  {
    id: 1,
    customer: 'Juan Perez',
    product: 'Laptop Lenovo ThinkPad',
    quantity: 1,
    total: 2500000,
    status: 'Pendiente',
    createdAt: '2026-03-01T10:00:00.000Z'
  },
  {
    id: 2,
    customer: 'Maria Gomez',
    product: 'Monitor Samsung 27"',
    quantity: 2,
    total: 1600000,
    status: 'Enviado',
    createdAt: '2026-03-02T14:30:00.000Z'
  },
  {
    id: 3,
    customer: 'Carlos Lopez',
    product: 'Teclado Mecánico RGB',
    quantity: 3,
    total: 450000,
    status: 'Entregado',
    createdAt: '2026-03-03T18:45:00.000Z'
  },
  {
    id: 4,
    customer: 'Laura Torres',
    product: 'Mouse Ergonómico',
    quantity: 1,
    total: 120000,
    status: 'Cancelado',
    createdAt: '2026-03-04T08:15:00.000Z'
  }
];
