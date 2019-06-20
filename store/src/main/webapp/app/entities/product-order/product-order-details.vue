<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="productOrder">
                <h2 class="jh-entity-heading"><span v-text="$t('storeApp.productOrder.detail.title')">ProductOrder</span> {{productOrder.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span v-text="$t('storeApp.productOrder.placedDate')">Placed Date</span>
                    </dt>
                    <dd>
                        <span>{{productOrder.placedDate | formatDate}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('storeApp.productOrder.status')">Status</span>
                    </dt>
                    <dd>
                        <span v-text="$t('storeApp.OrderStatus.' + productOrder.status)">{{productOrder.status}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('storeApp.productOrder.code')">Code</span>
                    </dt>
                    <dd>
                        <span>{{productOrder.code}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('storeApp.productOrder.invoiceId')">Invoice Id</span>
                    </dt>
                    <dd>
                        <span>{{productOrder.invoiceId}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('storeApp.productOrder.customer')">Customer</span>
                    </dt>
                    <dd>
                        <div v-if="productOrder.customer">
                            <router-link :to="{name: 'CustomerView', params: {customerId: productOrder.customer.id}}">{{productOrder.customer.email}}</router-link>
                        </div>
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
                </button>
                <router-link v-if="productOrder.id" :to="{name: 'ProductOrderEdit', params: {productOrderId: productOrder.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./product-order-details.component.ts">
</script>
