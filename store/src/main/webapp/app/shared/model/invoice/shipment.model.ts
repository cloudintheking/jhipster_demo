export interface IShipment {
  id?: number;
  trackingCode?: string;
  date?: Date;
  details?: string;
  invoiceCode?: string;
  invoiceId?: number;
}

export class Shipment implements IShipment {
  constructor(
    public id?: number,
    public trackingCode?: string,
    public date?: Date,
    public details?: string,
    public invoiceCode?: string,
    public invoiceId?: number
  ) {}
}
