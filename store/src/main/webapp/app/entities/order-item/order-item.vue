<template>
    <div>
        <h2 id="page-heading">
            <span v-text="$t('storeApp.orderItem.home.title')" id="order-item-heading">Order Items</span>
            <router-link :to="{name: 'OrderItemCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-order-item">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span  v-text="$t('storeApp.orderItem.home.createLabel')">
                    Create new OrderItem
                </span>
            </router-link>
        </h2>
        <b-alert :show="dismissCountDown"
            dismissible
            :variant="alertType"
            @dismissed="dismissCountDown=0"
            @dismiss-count-down="countDownChanged">
            {{alertMessage}}
        </b-alert>
        <br/>
        <div class="table-responsive" v-if="orderItems">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th v-on:click="changeOrder('id')"><span v-text="$t('global.field.id')">ID</span> <font-awesome-icon icon="sort"></font-awesome-icon></th>
                    <th v-on:click="changeOrder('quantity')"><span v-text="$t('storeApp.orderItem.quantity')">Quantity</span> <font-awesome-icon icon="sort"></font-awesome-icon></th>
                    <th v-on:click="changeOrder('totalPrice')"><span v-text="$t('storeApp.orderItem.totalPrice')">Total Price</span> <font-awesome-icon icon="sort"></font-awesome-icon></th>
                    <th v-on:click="changeOrder('status')"><span v-text="$t('storeApp.orderItem.status')">Status</span> <font-awesome-icon icon="sort"></font-awesome-icon></th>
                    <th v-on:click="changeOrder('product.name')"><span v-text="$t('storeApp.orderItem.product')">Product</span> <font-awesome-icon icon="sort"></font-awesome-icon></th>
                    <th v-on:click="changeOrder('order.code')"><span v-text="$t('storeApp.orderItem.order')">Order</span> <font-awesome-icon icon="sort"></font-awesome-icon></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="orderItem of orderBy(orderItems, propOrder, reverse === true ? 1 : -1)"
                    :key="orderItem.id">
                    <td>
                        <router-link :to="{name: 'OrderItemView', params: {orderItemId: orderItem.id}}">{{orderItem.id}}</router-link>
                    </td>
                    <td>{{orderItem.quantity}}</td>
                    <td>{{orderItem.totalPrice}}</td>
                    <td v-text="$t('storeApp.OrderItemStatus.' + orderItem.status)">{{orderItem.status}}</td>
                    <td>
                        <div v-if="orderItem.product">
                            <router-link :to="{name: 'ProductView', params: {productId: orderItem.product.id}}">{{orderItem.product.name}}</router-link>
                        </div>
                    </td>
                    <td>
                        <div v-if="orderItem.order">
                            <router-link :to="{name: 'ProductOrderView', params: {orderId: orderItem.order.id}}">{{orderItem.order.code}}</router-link>
                        </div>
                    </td>
                    <td class="text-right">
                        <div class="btn-group flex-btn-group-container">
                            <router-link :to="{name: 'OrderItemView', params: {orderItemId: orderItem.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                            </router-link>
                            <router-link :to="{name: 'OrderItemEdit', params: {orderItemId: orderItem.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(orderItem)"
                                   variant="danger"
                                   class="btn btn-sm"
                                   v-b-modal.removeEntity>
                                <font-awesome-icon icon="times"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.delete')">Delete</span>
                            </b-button>
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <b-modal ref="removeEntity" id="removeEntity" >
            <span slot="modal-title"><span id="storeApp.orderItem.delete.question" v-text="$t('entity.delete.title')">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-orderItem-heading" v-bind:title="$t('storeApp.orderItem.delete.question')">Are you sure you want to delete this Order Item?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-orderItem" v-text="$t('entity.action.delete')" v-on:click="removeOrderItem()">Delete</button>
            </div>
        </b-modal>
        <div v-if="orderItems && orderItems.length">
            <div class="row justify-content-center">
                <jhi-item-count :page="page" :total="queryCount" :itemsPerPage="itemsPerPage"></jhi-item-count>
            </div>
            <div class="row justify-content-center">
                <b-pagination size="md" :total-rows="totalItems" v-model="page" :per-page="itemsPerPage" :change="loadPage(page)"></b-pagination>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./order-item.component.ts">
</script>
