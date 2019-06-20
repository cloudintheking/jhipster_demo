import { Component, Vue, Inject } from 'vue-property-decorator';

import { IProductCategory } from '@/shared/model/product-category.model';
import ProductCategoryService from './product-category.service';

@Component
export default class ProductCategoryDetails extends Vue {
  @Inject('productCategoryService') private productCategoryService: () => ProductCategoryService;
  public productCategory: IProductCategory = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.productCategoryId) {
        vm.retrieveProductCategory(to.params.productCategoryId);
      }
    });
  }

  public retrieveProductCategory(productCategoryId) {
    this.productCategoryService()
      .find(productCategoryId)
      .then(res => {
        this.productCategory = res;
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
