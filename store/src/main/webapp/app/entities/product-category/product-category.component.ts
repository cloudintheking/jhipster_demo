import { mixins } from 'vue-class-component';
import { Component, Inject, Vue } from 'vue-property-decorator';
import { IProductCategory } from '@/shared/model/product-category.model';
import AlertService from '@/shared/alert/alert.service';

import ProductCategoryService from './product-category.service';

@Component
export default class ProductCategory extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('productCategoryService') private productCategoryService: () => ProductCategoryService;
  private removeId: string = null;
  public productCategories: IProductCategory[] = [];

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
    this.retrieveAllProductCategorys();
  }

  public clear(): void {
    this.retrieveAllProductCategorys();
  }

  public retrieveAllProductCategorys(): void {
    this.productCategoryService()
      .retrieve()
      .then(res => {
        this.productCategories = res.data;
      });
  }

  public prepareRemove(instance): void {
    this.removeId = instance.id;
  }

  public removeProductCategory(): void {
    this.productCategoryService()
      .delete(this.removeId)
      .then(() => {
        const message = this.$t('storeApp.productCategory.deleted', { param: this.removeId });
        this.alertService().showAlert(message, 'danger');
        this.getAlertFromStore();

        this.removeId = null;
        this.retrieveAllProductCategorys();
        this.closeDialog();
      });
  }

  public closeDialog(): void {
    (<any>this.$refs.removeEntity).hide();
  }
}
