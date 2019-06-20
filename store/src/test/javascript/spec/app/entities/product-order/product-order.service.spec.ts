/* tslint:disable max-line-length */
import axios from 'axios';
import { format } from 'date-fns';

import * as config from '@/shared/config/config';
import { DATE_TIME_FORMAT } from '@/shared/date/filters';
import ProductOrderService from '@/entities/product-order/product-order.service';
import { ProductOrder, OrderStatus } from '@/shared/model/product-order.model';

const mockedAxios: any = axios;
jest.mock('axios', () => ({
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn()
}));

describe('Service Tests', () => {
  describe('ProductOrder Service', () => {
    let service: ProductOrderService;
    let elemDefault;
    let currentDate: Date;
    beforeEach(() => {
      service = new ProductOrderService();
      currentDate = new Date();

      elemDefault = new ProductOrder(0, currentDate, OrderStatus.COMPLETED, 'AAAAAAA', 0);
    });

    describe('Service methods', async () => {
      it('should find an element', async () => {
        const returnedFromService = Object.assign(
          {
            placedDate: format(currentDate, DATE_TIME_FORMAT)
          },
          elemDefault
        );
        mockedAxios.get.mockReturnValue(Promise.resolve({ data: returnedFromService }));

        service.find(123).then(res => {
          expect(res).toMatchObject(elemDefault);
        });
      });

      it('should create a ProductOrder', async () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            placedDate: format(currentDate, DATE_TIME_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            placedDate: currentDate
          },
          returnedFromService
        );

        mockedAxios.post.mockReturnValue(Promise.resolve({ data: returnedFromService }));
        service.create({}).then(res => {
          expect(res).toMatchObject(expected);
        });
      });

      it('should update a ProductOrder', async () => {
        const returnedFromService = Object.assign(
          {
            placedDate: format(currentDate, DATE_TIME_FORMAT),
            status: 'BBBBBB',
            code: 'BBBBBB',
            invoiceId: 1
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            placedDate: currentDate
          },
          returnedFromService
        );
        mockedAxios.put.mockReturnValue(Promise.resolve({ data: returnedFromService }));

        service.update(expected).then(res => {
          expect(res).toMatchObject(expected);
        });
      });

      it('should return a list of ProductOrder', async () => {
        const returnedFromService = Object.assign(
          {
            placedDate: format(currentDate, DATE_TIME_FORMAT),
            status: 'BBBBBB',
            code: 'BBBBBB',
            invoiceId: 1
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            placedDate: currentDate
          },
          returnedFromService
        );
        mockedAxios.get.mockReturnValue(Promise.resolve([returnedFromService]));
        service.retrieve(expected).then(res => {
          expect(res).toContainEqual(expected);
        });
      });

      it('should delete a ProductOrder', async () => {
        mockedAxios.delete.mockReturnValue(Promise.resolve({ ok: true }));
        service.delete(123).then(res => {
          expect(res.ok);
        });
      });
    });
  });
});
