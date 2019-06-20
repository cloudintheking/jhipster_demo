import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength } from 'vuelidate/lib/validators';

import ProductService from '../product/product.service';
import { IProduct } from '@/shared/model/product.model';

import AlertService from '@/shared/alert/alert.service';
import { IProductCategory, ProductCategory } from '@/shared/model/product-category.model';
import ProductCategoryService from './product-category.service';

const validations: any = {
  productCategory: {
    name: {
      required
    },
    description: {}
  }
};

@Component({
  validations
})
export default class ProductCategoryUpdate extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('productCategoryService') private productCategoryService: () => ProductCategoryService;
  public productCategory: IProductCategory = new ProductCategory();

  @Inject('productService') private productService: () => ProductService;

  public products: IProduct[] = [];
  public isSaving = false;

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.productCategoryId) {
        vm.retrieveProductCategory(to.params.productCategoryId);
      }
      vm.initRelationships();
    });
  }

  public save(): void {
    this.isSaving = true;
    if (this.productCategory.id) {
      this.productCategoryService()
        .update(this.productCategory)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('storeApp.productCategory.updated', { param: param.id });
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.productCategoryService()
        .create(this.productCategory)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('storeApp.productCategory.created', { param: param.id });
          this.alertService().showAlert(message, 'success');
        });
    }
  }

  public retrieveProductCategory(productCategoryId): void {
    this.productCategoryService()
      .find(productCategoryId)
      .then(res => {
        this.productCategory = res;
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
  }
}
