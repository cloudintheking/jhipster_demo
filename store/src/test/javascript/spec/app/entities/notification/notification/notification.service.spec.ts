/* tslint:disable max-line-length */
import axios from 'axios';
import { format } from 'date-fns';

import * as config from '@/shared/config/config';
import { DATE_TIME_FORMAT } from '@/shared/date/filters';
import NotificationService from '@/entities/notification/notification/notification.service';
import { Notification, NotificationType } from '@/shared/model/notification/notification.model';

const mockedAxios: any = axios;
jest.mock('axios', () => ({
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn()
}));

describe('Service Tests', () => {
  describe('Notification Service', () => {
    let service: NotificationService;
    let elemDefault;
    let currentDate: Date;
    beforeEach(() => {
      service = new NotificationService();
      currentDate = new Date();

      elemDefault = new Notification(0, currentDate, 'AAAAAAA', currentDate, NotificationType.EMAIL, 0, 0);
    });

    describe('Service methods', async () => {
      it('should find an element', async () => {
        const returnedFromService = Object.assign(
          {
            date: format(currentDate, DATE_TIME_FORMAT),
            sentDate: format(currentDate, DATE_TIME_FORMAT)
          },
          elemDefault
        );
        mockedAxios.get.mockReturnValue(Promise.resolve({ data: returnedFromService }));

        service.find(123).then(res => {
          expect(res).toMatchObject(elemDefault);
        });
      });

      it('should create a Notification', async () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            date: format(currentDate, DATE_TIME_FORMAT),
            sentDate: format(currentDate, DATE_TIME_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            date: currentDate,
            sentDate: currentDate
          },
          returnedFromService
        );

        mockedAxios.post.mockReturnValue(Promise.resolve({ data: returnedFromService }));
        service.create({}).then(res => {
          expect(res).toMatchObject(expected);
        });
      });

      it('should update a Notification', async () => {
        const returnedFromService = Object.assign(
          {
            date: format(currentDate, DATE_TIME_FORMAT),
            details: 'BBBBBB',
            sentDate: format(currentDate, DATE_TIME_FORMAT),
            format: 'BBBBBB',
            userId: 1,
            productId: 1
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            date: currentDate,
            sentDate: currentDate
          },
          returnedFromService
        );
        mockedAxios.put.mockReturnValue(Promise.resolve({ data: returnedFromService }));

        service.update(expected).then(res => {
          expect(res).toMatchObject(expected);
        });
      });

      it('should return a list of Notification', async () => {
        const returnedFromService = Object.assign(
          {
            date: format(currentDate, DATE_TIME_FORMAT),
            details: 'BBBBBB',
            sentDate: format(currentDate, DATE_TIME_FORMAT),
            format: 'BBBBBB',
            userId: 1,
            productId: 1
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            date: currentDate,
            sentDate: currentDate
          },
          returnedFromService
        );
        mockedAxios.get.mockReturnValue(Promise.resolve([returnedFromService]));
        service.retrieve().then(res => {
          expect(res).toContainEqual(expected);
        });
      });

      it('should delete a Notification', async () => {
        mockedAxios.delete.mockReturnValue(Promise.resolve({ ok: true }));
        service.delete(123).then(res => {
          expect(res.ok);
        });
      });
    });
  });
});
