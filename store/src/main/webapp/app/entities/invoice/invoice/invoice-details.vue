<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="invoice">
                <h2 class="jh-entity-heading"><span v-text="$t('storeApp.invoiceInvoice.detail.title')">Invoice</span> {{invoice.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span v-text="$t('storeApp.invoiceInvoice.code')">Code</span>
                    </dt>
                    <dd>
                        <span>{{invoice.code}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('storeApp.invoiceInvoice.date')">Date</span>
                    </dt>
                    <dd>
                        <span>{{invoice.date | formatDate}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('storeApp.invoiceInvoice.details')">Details</span>
                    </dt>
                    <dd>
                        <span>{{invoice.details}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('storeApp.invoiceInvoice.status')">Status</span>
                    </dt>
                    <dd>
                        <span v-text="$t('storeApp.InvoiceStatus.' + invoice.status)">{{invoice.status}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('storeApp.invoiceInvoice.paymentMethod')">Payment Method</span>
                    </dt>
                    <dd>
                        <span v-text="$t('storeApp.PaymentMethod.' + invoice.paymentMethod)">{{invoice.paymentMethod}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('storeApp.invoiceInvoice.paymentDate')">Payment Date</span>
                    </dt>
                    <dd>
                        <span>{{invoice.paymentDate | formatDate}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('storeApp.invoiceInvoice.paymentAmount')">Payment Amount</span>
                    </dt>
                    <dd>
                        <span>{{invoice.paymentAmount}}</span>
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
                </button>
                <router-link v-if="invoice.id" :to="{name: 'InvoiceEdit', params: {invoiceId: invoice.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./invoice-details.component.ts">
</script>
