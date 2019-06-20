import { Component, Vue, Inject } from 'vue-property-decorator';

import { IShipment } from '@/shared/model/invoice/shipment.model';
import ShipmentService from './shipment.service';

@Component
export default class ShipmentDetails extends Vue {
  @Inject('shipmentService') private shipmentService: () => ShipmentService;
  public shipment: IShipment = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.shipmentId) {
        vm.retrieveShipment(to.params.shipmentId);
      }
    });
  }

  public retrieveShipment(shipmentId) {
    this.shipmentService()
      .find(shipmentId)
      .then(res => {
        this.shipment = res;
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
