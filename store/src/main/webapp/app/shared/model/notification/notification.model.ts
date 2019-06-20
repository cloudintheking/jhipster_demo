export const enum NotificationType {
  EMAIL = 'EMAIL',
  SMS = 'SMS',
  PARCEL = 'PARCEL'
}

export interface INotification {
  id?: number;
  date?: Date;
  details?: string;
  sentDate?: Date;
  format?: NotificationType;
  userId?: number;
  productId?: number;
}

export class Notification implements INotification {
  constructor(
    public id?: number,
    public date?: Date,
    public details?: string,
    public sentDate?: Date,
    public format?: NotificationType,
    public userId?: number,
    public productId?: number
  ) {}
}
