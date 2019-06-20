<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="shipment">
                <h2 class="jh-entity-heading"><span v-text="$t('storeApp.invoiceShipment.detail.title')">Shipment</span> {{shipment.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span v-text="$t('storeApp.invoiceShipment.trackingCode')">Tracking Code</span>
                    </dt>
                    <dd>
                        <span>{{shipment.trackingCode}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('storeApp.invoiceShipment.date')">Date</span>
                    </dt>
                    <dd>
                        <span>{{shipment.date | formatDate}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('storeApp.invoiceShipment.details')">Details</span>
                    </dt>
                    <dd>
                        <span>{{shipment.details}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('storeApp.invoiceShipment.invoice')">Invoice</span>
                    </dt>
                    <dd>
                        <div v-if="shipment.invoiceId">
                            <router-link :to="{name: 'InvoiceView', params: {invoiceId: shipment.invoiceId}}">{{shipment.invoiceCode}}</router-link>
                        </div>
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
                </button>
                <router-link v-if="shipment.id" :to="{name: 'ShipmentEdit', params: {shipmentId: shipment.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./shipment-details.component.ts">
</script>
