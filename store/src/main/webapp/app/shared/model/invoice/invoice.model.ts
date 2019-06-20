import { IShipment } from '@/shared/model/invoice/shipment.model';

export const enum InvoiceStatus {
  PAID = 'PAID',
  ISSUED = 'ISSUED',
  CANCELLED = 'CANCELLED'
}

export const enum PaymentMethod {
  CREDIT_CARD = 'CREDIT_CARD',
  CASH_ON_DELIVERY = 'CASH_ON_DELIVERY',
  PAYPAL = 'PAYPAL'
}

export interface IInvoice {
  id?: number;
  code?: string;
  date?: Date;
  details?: string;
  status?: InvoiceStatus;
  paymentMethod?: PaymentMethod;
  paymentDate?: Date;
  paymentAmount?: number;
  shipments?: IShipment[];
}

export class Invoice implements IInvoice {
  constructor(
    public id?: number,
    public code?: string,
    public date?: Date,
    public details?: string,
    public status?: InvoiceStatus,
    public paymentMethod?: PaymentMethod,
    public paymentDate?: Date,
    public paymentAmount?: number,
    public shipments?: IShipment[]
  ) {}
}
