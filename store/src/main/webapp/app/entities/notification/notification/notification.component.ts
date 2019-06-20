import { mixins } from 'vue-class-component';
import { Component, Inject, Vue } from 'vue-property-decorator';
import { INotification } from '@/shared/model/notification/notification.model';
import AlertService from '@/shared/alert/alert.service';

import NotificationService from './notification.service';

@Component
export default class Notification extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('notificationService') private notificationService: () => NotificationService;
  private removeId: string = null;
  public notifications: INotification[] = [];

  public dismissCountDown: number = this.$store.getters.dismissCountDown;
  public dismissSecs: number = this.$store.getters.dismissSecs;
  public alertType: string = this.$store.getters.alertType;
  public alertMessage: any = this.$store.getters.alertMessage;

  public getAlertFromStore() {
    this.dismissCountDown = this.$store.getters.dismissCountDown;
    this.dismissSecs = this.$store.getters.dismissSecs;
    this.alertType = this.$store.getters.alertType;
    this.alertMessage = this.$store.getters.alertMessage;
  }

  public countDownChanged(dismissCountDown: number) {
    this.alertService().countDownChanged(dismissCountDown);
    this.getAlertFromStore();
  }

  public mounted(): void {
    this.retrieveAllNotifications();
  }

  public clear(): void {
    this.retrieveAllNotifications();
  }

  public retrieveAllNotifications(): void {
    this.notificationService()
      .retrieve()
      .then(res => {
        this.notifications = res.data;
      });
  }

  public prepareRemove(instance): void {
    this.removeId = instance.id;
  }

  public removeNotification(): void {
    this.notificationService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('storeApp.notificationNotification.deleted', { param: this.removeId });
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();

        this.removeId = null;
        this.retrieveAllNotifications();
        this.closeDialog();
      });
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}
