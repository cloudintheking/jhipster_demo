import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength } from 'vuelidate/lib/validators';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import { DATE_TIME_LONG_FORMAT, INSTANT_FORMAT, ZONED_DATE_TIME_FORMAT } from '@/shared/date/filters';

import InvoiceService from '../invoice/invoice.service';
import { IInvoice } from '@/shared/model/invoice/invoice.model';

import AlertService from '@/shared/alert/alert.service';
import { IShipment, Shipment } from '@/shared/model/invoice/shipment.model';
import ShipmentService from './shipment.service';

const validations: any = {
  shipment: {
    trackingCode: {},
    date: {
      required
    },
    details: {},
    invoiceId: {
      required
    }
  }
};

@Component({
  validations
})
export default class ShipmentUpdate extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('shipmentService') private shipmentService: () => ShipmentService;
  public shipment: IShipment = new Shipment();

  @Inject('invoiceService') private invoiceService: () => InvoiceService;

  public invoices: IInvoice[] = [];
  public isSaving = false;

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.shipmentId) {
        vm.retrieveShipment(to.params.shipmentId);
      }
      vm.initRelationships();
    });
  }

  public save(): void {
    this.isSaving = true;
    if (this.shipment.id) {
      this.shipmentService()
        .update(this.shipment)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('storeApp.invoiceShipment.updated', { param: param.id });
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.shipmentService()
        .create(this.shipment)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('storeApp.invoiceShipment.created', { param: param.id });
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
      this.shipment[field] = parse(event.target.value, DATE_TIME_LONG_FORMAT, new Date());
    } else {
      this.shipment[field] = null;
    }
  }

  public updateZonedDateTimeField(field, event) {
    if (event.target.value) {
      this.shipment[field] = parse(event.target.value, DATE_TIME_LONG_FORMAT, new Date());
    } else {
      this.shipment[field] = null;
    }
  }

  public retrieveShipment(shipmentId): void {
    this.shipmentService()
      .find(shipmentId)
      .then(res => {
        this.shipment = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.invoiceService()
      .retrieve()
      .then(res => {
        this.invoices = res.data;
      });
  }
}
