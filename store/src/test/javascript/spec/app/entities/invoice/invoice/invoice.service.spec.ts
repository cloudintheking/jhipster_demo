/* tslint:disable max-line-length */
import axios from 'axios';
import { format } from 'date-fns';

import * as config from '@/shared/config/config';
import { DATE_TIME_FORMAT } from '@/shared/date/filters';
import InvoiceService from '@/entities/invoice/invoice/invoice.service';
import { Invoice, InvoiceStatus, PaymentMethod } from '@/shared/model/invoice/invoice.model';

const mockedAxios: any = axios;
jest.mock('axios', () => ({
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn()
}));

describe('Service Tests', () => {
  describe('Invoice Service', () => {
    let service: InvoiceService;
    let elemDefault;
    let currentDate: Date;
    beforeEach(() => {
      service = new InvoiceService();
      currentDate = new Date();

      elemDefault = new Invoice(0, 'AAAAAAA', currentDate, 'AAAAAAA', InvoiceStatus.PAID, PaymentMethod.CREDIT_CARD, currentDate, 0);
    });

    describe('Service methods', async () => {
      it('should find an element', async () => {
        const returnedFromService = Object.assign(
          {
            date: format(currentDate, DATE_TIME_FORMAT),
            paymentDate: format(currentDate, DATE_TIME_FORMAT)
          },
          elemDefault
        );
        mockedAxios.get.mockReturnValue(Promise.resolve({ data: returnedFromService }));

        service.find(123).then(res => {
          expect(res).toMatchObject(elemDefault);
        });
      });

      it('should create a Invoice', async () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            date: format(currentDate, DATE_TIME_FORMAT),
            paymentDate: format(currentDate, DATE_TIME_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            date: currentDate,
            paymentDate: currentDate
          },
          returnedFromService
        );

        mockedAxios.post.mockReturnValue(Promise.resolve({ data: returnedFromService }));
        service.create({}).then(res => {
          expect(res).toMatchObject(expected);
        });
      });

      it('should update a Invoice', async () => {
        const returnedFromService = Object.assign(
          {
            code: 'BBBBBB',
            date: format(currentDate, DATE_TIME_FORMAT),
            details: 'BBBBBB',
            status: 'BBBBBB',
            paymentMethod: 'BBBBBB',
            paymentDate: format(currentDate, DATE_TIME_FORMAT),
            paymentAmount: 1
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            date: currentDate,
            paymentDate: currentDate
          },
          returnedFromService
        );
        mockedAxios.put.mockReturnValue(Promise.resolve({ data: returnedFromService }));

        service.update(expected).then(res => {
          expect(res).toMatchObject(expected);
        });
      });

      it('should return a list of Invoice', async () => {
        const returnedFromService = Object.assign(
          {
            code: 'BBBBBB',
            date: format(currentDate, DATE_TIME_FORMAT),
            details: 'BBBBBB',
            status: 'BBBBBB',
            paymentMethod: 'BBBBBB',
            paymentDate: format(currentDate, DATE_TIME_FORMAT),
            paymentAmount: 1
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            date: currentDate,
            paymentDate: currentDate
          },
          returnedFromService
        );
        mockedAxios.get.mockReturnValue(Promise.resolve([returnedFromService]));
        service.retrieve(expected).then(res => {
          expect(res).toContainEqual(expected);
        });
      });

      it('should delete a Invoice', async () => {
        mockedAxios.delete.mockReturnValue(Promise.resolve({ ok: true }));
        service.delete(123).then(res => {
          expect(res.ok);
        });
      });
    });
  });
});
