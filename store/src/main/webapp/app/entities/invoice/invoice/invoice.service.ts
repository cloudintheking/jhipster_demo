import axios from 'axios';

import buildPaginationQueryOpts from '@/shared/sort/sorts';

import { IInvoice } from '@/shared/model/invoice/invoice.model';

const baseApiUrl = 'invoice/api/invoices';

export default class InvoiceService {
  public find(id): Promise<IInvoice> {
    return new Promise<IInvoice>(resolve => {
      axios.get(`${baseApiUrl}/${id}`).then(function(res) {
        resolve(res.data);
      });
    });
  }

  public retrieve(paginationQuery?: any): Promise<any> {
    return new Promise<any>(resolve => {
      axios.get(baseApiUrl + `?${buildPaginationQueryOpts(paginationQuery)}`).then(function(res) {
        resolve(res);
      });
    });
  }

  public delete(id): Promise<any> {
    return new Promise<any>(resolve => {
      axios.delete(`${baseApiUrl}/${id}`).then(function(res) {
        resolve(res);
      });
    });
  }

  public create(entity): Promise<IInvoice> {
    return new Promise<IInvoice>(resolve => {
      axios.post(`${baseApiUrl}`, entity).then(function(res) {
        resolve(res.data);
      });
    });
  }

  public update(entity): Promise<IInvoice> {
    return new Promise<IInvoice>(resolve => {
      axios.put(`${baseApiUrl}`, entity).then(function(res) {
        resolve(res.data);
      });
    });
  }
}
