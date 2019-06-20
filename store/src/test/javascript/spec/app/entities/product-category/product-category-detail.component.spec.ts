/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import axios from 'axios';

import * as config from '@/shared/config/config';
import ProductCategoryDetailComponent from '@/entities/product-category/product-category-details.vue';
import ProductCategoryClass from '@/entities/product-category/product-category-details.component';
import ProductCategoryService from '@/entities/product-category/product-category.service';

const localVue = createLocalVue();
const mockedAxios: any = axios;

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

jest.mock('axios', () => ({
  get: jest.fn()
}));

describe('Component Tests', () => {
  describe('ProductCategory Management Detail Component', () => {
    let wrapper: Wrapper<ProductCategoryClass>;
    let comp: ProductCategoryClass;

    beforeEach(() => {
      mockedAxios.get.mockReset();
      mockedAxios.get.mockReturnValue(Promise.resolve({}));

      wrapper = shallowMount<ProductCategoryClass>(ProductCategoryDetailComponent, {
        store,
        i18n,
        localVue,
        provide: { productCategoryService: () => new ProductCategoryService() }
      });
      comp = wrapper.vm;
    });

    describe('OnInit', async () => {
      it('Should call load all on init', async () => {
        // GIVEN
        mockedAxios.get.mockReturnValue(Promise.resolve({ data: { id: 123 } }));

        // WHEN
        comp.retrieveProductCategory(123);
        await comp.$nextTick();

        // THEN
        expect(comp.productCategory).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
