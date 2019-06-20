import { Component, Vue, Inject } from 'vue-property-decorator';

import { IOrderItem } from '@/shared/model/order-item.model';
import OrderItemService from './order-item.service';

@Component
export default class OrderItemDetails extends Vue {
  @Inject('orderItemService') private orderItemService: () => OrderItemService;
  public orderItem: IOrderItem = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.orderItemId) {
        vm.retrieveOrderItem(to.params.orderItemId);
      }
    });
  }

  public retrieveOrderItem(orderItemId) {
    this.orderItemService()
      .find(orderItemId)
      .then(res => {
        this.orderItem = res;
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
