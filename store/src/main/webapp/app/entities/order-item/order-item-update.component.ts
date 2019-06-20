import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength } from 'vuelidate/lib/validators';

import ProductService from '../product/product.service';
import { IProduct } from '@/shared/model/product.model';

import ProductOrderService from '../product-order/product-order.service';
import { IProductOrder } from '@/shared/model/product-order.model';

import AlertService from '@/shared/alert/alert.service';
import { IOrderItem, OrderItem } from '@/shared/model/order-item.model';
import OrderItemService from './order-item.service';

const validations: any = {
  orderItem: {
    quantity: {
      required,
      numeric
    },
    totalPrice: {
      required,
      numeric
    },
    status: {
      required
    },
    productId: {
      required
    },
    orderId: {
      required
    }
  }
};

@Component({
  validations
})
export default class OrderItemUpdate extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('orderItemService') private orderItemService: () => OrderItemService;
  public orderItem: IOrderItem = new OrderItem();

  @Inject('productService') private productService: () => ProductService;

  public products: IProduct[] = [];

  @Inject('productOrderService') private productOrderService: () => ProductOrderService;

  public productOrders: IProductOrder[] = [];
  public isSaving = false;

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.orderItemId) {
        vm.retrieveOrderItem(to.params.orderItemId);
      }
      vm.initRelationships();
    });
  }

  public save(): void {
    this.isSaving = true;
    if (this.orderItem.id) {
      this.orderItemService()
        .update(this.orderItem)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('storeApp.orderItem.updated', { param: param.id });
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.orderItemService()
        .create(this.orderItem)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('storeApp.orderItem.created', { param: param.id });
          this.alertService().showAlert(message, 'success');
        });
    }
  }

  public retrieveOrderItem(orderItemId): void {
    this.orderItemService()
      .find(orderItemId)
      .then(res => {
        this.orderItem = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.productService()
      .retrieve()
      .then(res => {
        this.products = res.data;
      });
    this.productOrderService()
      .retrieve()
      .then(res => {
        this.productOrders = res.data;
      });
  }
}
