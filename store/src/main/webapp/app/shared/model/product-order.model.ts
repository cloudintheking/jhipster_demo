import { IOrderItem } from '@/shared/model/order-item.model';
import { ICustomer } from '@/shared/model/customer.model';

export const enum OrderStatus {
  COMPLETED = 'COMPLETED',
  PENDING = 'PENDING',
  CANCELLED = 'CANCELLED'
}

export interface IProductOrder {
  id?: number;
  placedDate?: Date;
  status?: OrderStatus;
  code?: string;
  invoiceId?: number;
  orderItems?: IOrderItem[];
  customer?: ICustomer;
}

export class ProductOrder implements IProductOrder {
  constructor(
    public id?: number,
    public placedDate?: Date,
    public status?: OrderStatus,
    public code?: string,
    public invoiceId?: number,
    public orderItems?: IOrderItem[],
    public customer?: ICustomer
  ) {}
}
