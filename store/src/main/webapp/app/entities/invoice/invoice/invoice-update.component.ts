import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength } from 'vuelidate/lib/validators';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import { DATE_TIME_LONG_FORMAT, INSTANT_FORMAT, ZONED_DATE_TIME_FORMAT } from '@/shared/date/filters';

import ShipmentService from '../shipment/shipment.service';
import { IShipment } from '@/shared/model/invoice/shipment.model';

import AlertService from '@/shared/alert/alert.service';
import { IInvoice, Invoice } from '@/shared/model/invoice/invoice.model';
import InvoiceService from './invoice.service';

const validations: any = {
  invoice: {
    code: {
      required
    },
    date: {
      required
    },
    details: {},
    status: {
      required
    },
    paymentMethod: {
      required
    },
    paymentDate: {
      required
    },
    paymentAmount: {
      required,
      numeric
    }
  }
};

@Component({
  validations
})
export default class InvoiceUpdate extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('invoiceService') private invoiceService: () => InvoiceService;
  public invoice: IInvoice = new Invoice();

  @Inject('shipmentService') private shipmentService: () => ShipmentService;

  public shipments: IShipment[] = [];
  public isSaving = false;

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.invoiceId) {
        vm.retrieveInvoice(to.params.invoiceId);
      }
      vm.initRelationships();
    });
  }

  public save(): void {
    this.isSaving = true;
    if (this.invoice.id) {
      this.invoiceService()
        .update(this.invoice)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('storeApp.invoiceInvoice.updated', { param: param.id });
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.invoiceService()
        .create(this.invoice)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('storeApp.invoiceInvoice.created', { param: param.id });
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
      this.invoice[field] = parse(event.target.value, DATE_TIME_LONG_FORMAT, new Date());
    } else {
      this.invoice[field] = null;
    }
  }

  public updateZonedDateTimeField(field, event) {
    if (event.target.value) {
      this.invoice[field] = parse(event.target.value, DATE_TIME_LONG_FORMAT, new Date());
    } else {
      this.invoice[field] = null;
    }
  }

  public retrieveInvoice(invoiceId): void {
    this.invoiceService()
      .find(invoiceId)
      .then(res => {
        this.invoice = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.shipmentService()
      .retrieve()
      .then(res => {
        this.shipments = res.data;
      });
  }
}
