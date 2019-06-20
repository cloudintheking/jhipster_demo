/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import axios from 'axios';

import * as config from '@/shared/config/config';
import OrderItemDetailComponent from '@/entities/order-item/order-item-details.vue';
import OrderItemClass from '@/entities/order-item/order-item-details.component';
import OrderItemService from '@/entities/order-item/order-item.service';

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
  describe('OrderItem Management Detail Component', () => {
    let wrapper: Wrapper<OrderItemClass>;
    let comp: OrderItemClass;

    beforeEach(() => {
      mockedAxios.get.mockReset();
      mockedAxios.get.mockReturnValue(Promise.resolve({}));

      wrapper = shallowMount<OrderItemClass>(OrderItemDetailComponent, {
        store,
        i18n,
        localVue,
        provide: { orderItemService: () => new OrderItemService() }
      });
      comp = wrapper.vm;
    });

    describe('OnInit', async () => {
      it('Should call load all on init', async () => {
        // GIVEN
        mockedAxios.get.mockReturnValue(Promise.resolve({ data: { id: 123 } }));

        // WHEN
        comp.retrieveOrderItem(123);
        await comp.$nextTick();

        // THEN
        expect(comp.orderItem).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
