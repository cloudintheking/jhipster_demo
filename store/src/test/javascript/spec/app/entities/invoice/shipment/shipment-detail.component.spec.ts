/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import axios from 'axios';

import * as config from '@/shared/config/config';
import ShipmentDetailComponent from '@/entities/invoice/shipment/shipment-details.vue';
import ShipmentClass from '@/entities/invoice/shipment/shipment-details.component';
import ShipmentService from '@/entities/invoice/shipment/shipment.service';

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
  describe('Shipment Management Detail Component', () => {
    let wrapper: Wrapper<ShipmentClass>;
    let comp: ShipmentClass;

    beforeEach(() => {
      mockedAxios.get.mockReset();
      mockedAxios.get.mockReturnValue(Promise.resolve({}));

      wrapper = shallowMount<ShipmentClass>(ShipmentDetailComponent, {
        store,
        i18n,
        localVue,
        provide: { shipmentService: () => new ShipmentService() }
      });
      comp = wrapper.vm;
    });

    describe('OnInit', async () => {
      it('Should call load all on init', async () => {
        // GIVEN
        mockedAxios.get.mockReturnValue(Promise.resolve({ data: { id: 123 } }));

        // WHEN
        comp.retrieveShipment(123);
        await comp.$nextTick();

        // THEN
        expect(comp.shipment).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
