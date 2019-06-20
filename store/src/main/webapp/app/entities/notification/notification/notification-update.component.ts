import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength } from 'vuelidate/lib/validators';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import { DATE_TIME_LONG_FORMAT, INSTANT_FORMAT, ZONED_DATE_TIME_FORMAT } from '@/shared/date/filters';

import AlertService from '@/shared/alert/alert.service';
import { INotification, Notification } from '@/shared/model/notification/notification.model';
import NotificationService from './notification.service';

const validations: any = {
  notification: {
    date: {
      required
    },
    details: {},
    sentDate: {
      required
    },
    format: {
      required
    },
    userId: {
      required,
      numeric
    },
    productId: {
      required,
      numeric
    }
  }
};

@Component({
  validations
})
export default class NotificationUpdate extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('notificationService') private notificationService: () => NotificationService;
  public notification: INotification = new Notification();
  public isSaving = false;

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.notificationId) {
        vm.retrieveNotification(to.params.notificationId);
      }
    });
  }

  public save(): void {
    this.isSaving = true;
    if (this.notification.id) {
      this.notificationService()
        .update(this.notification)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('storeApp.notificationNotification.updated', { param: param.id });
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.notificationService()
        .create(this.notification)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('storeApp.notificationNotification.created', { param: param.id });
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
      this.notification[field] = parse(event.target.value, DATE_TIME_LONG_FORMAT, new Date());
    } else {
      this.notification[field] = null;
    }
  }

  public updateZonedDateTimeField(field, event) {
    if (event.target.value) {
      this.notification[field] = parse(event.target.value, DATE_TIME_LONG_FORMAT, new Date());
    } else {
      this.notification[field] = null;
    }
  }

  public retrieveNotification(notificationId): void {
    this.notificationService()
      .find(notificationId)
      .then(res => {
        this.notification = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {}
}
