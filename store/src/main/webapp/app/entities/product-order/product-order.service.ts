import axios from 'axios';

import buildPaginationQueryOpts from '@/shared/sort/sorts';

import { IProductOrder } from '@/shared/model/product-order.model';

const baseApiUrl = 'api/product-orders';

export default class ProductOrderService {
  public find(id): Promise<IProductOrder> {
    return new Promise<IProductOrder>(resolve => {
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

  public create(entity): Promise<IProductOrder> {
    return new Promise<IProductOrder>(resolve => {
      axios.post(`${baseApiUrl}`, entity).then(function(res) {
        resolve(res.data);
      });
    });
  }

  public update(entity): Promise<IProductOrder> {
    return new Promise<IProductOrder>(resolve => {
      axios.put(`${baseApiUrl}`, entity).then(function(res) {
        resolve(res.data);
      });
    });
  }
}
