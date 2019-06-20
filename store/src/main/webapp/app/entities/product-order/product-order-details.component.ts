import { Component, Vue, Inject } from 'vue-property-decorator';

import { IProductOrder } from '@/shared/model/product-order.model';
import ProductOrderService from './product-order.service';

@Component
export default class ProductOrderDetails extends Vue {
  @Inject('productOrderService') private productOrderService: () => ProductOrderService;
  public productOrder: IProductOrder = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.productOrderId) {
        vm.retrieveProductOrder(to.params.productOrderId);
      }
    });
  }

  public retrieveProductOrder(productOrderId) {
    this.productOrderService()
      .find(productOrderId)
      .then(res => {
        this.productOrder = res;
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
