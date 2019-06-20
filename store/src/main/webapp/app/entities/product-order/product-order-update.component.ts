import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength } from 'vuelidate/lib/validators';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import { DATE_TIME_LONG_FORMAT, INSTANT_FORMAT, ZONED_DATE_TIME_FORMAT } from '@/shared/date/filters';

import OrderItemService from '../order-item/order-item.service';
import { IOrderItem } from '@/shared/model/order-item.model';

import CustomerService from '../customer/customer.service';
import { ICustomer } from '@/shared/model/customer.model';

import AlertService from '@/shared/alert/alert.service';
import { IProductOrder, ProductOrder } from '@/shared/model/product-order.model';
import ProductOrderService from './product-order.service';

const validations: any = {
  productOrder: {
    placedDate: {
      required
    },
    status: {
      required
    },
    code: {
      required
    },
    invoiceId: {},
    customerId: {
      required
    }
  }
};

@Component({
  validations
})
export default class ProductOrderUpdate extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('productOrderService') private productOrderService: () => ProductOrderService;
  public productOrder: IProductOrder = new ProductOrder();

  @Inject('orderItemService') private orderItemService: () => OrderItemService;

  public orderItems: IOrderItem[] = [];

  @Inject('customerService') private customerService: () => CustomerService;

  public customers: ICustomer[] = [];
  public isSaving = false;

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.productOrderId) {
        vm.retrieveProductOrder(to.params.productOrderId);
      }
      vm.initRelationships();
    });
  }

  public save(): void {
    this.isSaving = true;
    if (this.productOrder.id) {
      this.productOrderService()
        .update(this.productOrder)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('storeApp.productOrder.updated', { param: param.id });
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.productOrderService()
        .create(this.productOrder)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('storeApp.productOrder.created', { param: param.id });
          this.alertService().showAlert(message, 'success');
        });
    }
  }

  public convertDateTimeFromServer(date: Date): string {
    if (date) {
      return format(date, DATE_TIME_LONG_FORMAT);
    }
    return null;
  }

  public updateInstantField(field, event) {
    if (event.target.value) {
      this.productOrder[field] = parse(event.target.value, DATE_TIME_LONG_FORMAT, new Date());
    } else {
      this.productOrder[field] = null;
    }
  }

  public updateZonedDateTimeField(field, event) {
    if (event.target.value) {
      this.productOrder[field] = parse(event.target.value, DATE_TIME_LONG_FORMAT, new Date());
    } else {
      this.productOrder[field] = null;
    }
  }

  public retrieveProductOrder(productOrderId): void {
    this.productOrderService()
      .find(productOrderId)
      .then(res => {
        this.productOrder = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.orderItemService()
      .retrieve()
      .then(res => {
        this.orderItems = res.data;
      });
    this.customerService()
      .retrieve()
      .then(res => {
        this.customers = res.data;
      });
  }
}
