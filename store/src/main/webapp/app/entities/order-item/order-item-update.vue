<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="storeApp.orderItem.home.createOrEditLabel" v-text="$t('storeApp.orderItem.home.createOrEditLabel')">Create or edit a OrderItem</h2>
                <div>
                    <div class="form-group" v-if="orderItem.id">
                        <label for="id" v-text="$t('global.field.id')">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="orderItem.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('storeApp.orderItem.quantity')" for="order-item-quantity">Quantity</label>
                        <input type="number" class="form-control" name="quantity" id="order-item-quantity"
                            :class="{'valid': !$v.orderItem.quantity.$invalid, 'invalid': $v.orderItem.quantity.$invalid }" v-model.number="$v.orderItem.quantity.$model"  required/>
                        <div v-if="$v.orderItem.quantity.$anyDirty && $v.orderItem.quantity.$invalid">
                            <small class="form-text text-danger" v-if="!$v.orderItem.quantity.required" v-text="$t('entity.validation.required')">
                                This field is required.
                            </small>
                            <small class="form-text text-danger" v-if="!$v.orderItem.quantity.minLength" v-bind:value="$t('entity.validation.min')">
                                This field should be at least 0 characters.
                            </small>
                            <small class="form-text text-danger" v-if="!$v.orderItem.quantity.number" v-text="$t('entity.validation.number')">
                                This field should be a number.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('storeApp.orderItem.totalPrice')" for="order-item-totalPrice">Total Price</label>
                        <input type="number" class="form-control" name="totalPrice" id="order-item-totalPrice"
                            :class="{'valid': !$v.orderItem.totalPrice.$invalid, 'invalid': $v.orderItem.totalPrice.$invalid }" v-model.number="$v.orderItem.totalPrice.$model"  required/>
                        <div v-if="$v.orderItem.totalPrice.$anyDirty && $v.orderItem.totalPrice.$invalid">
                            <small class="form-text text-danger" v-if="!$v.orderItem.totalPrice.required" v-text="$t('entity.validation.required')">
                                This field is required.
                            </small>
                            <small class="form-text text-danger" v-if="!$v.orderItem.totalPrice.minLength" v-bind:value="$t('entity.validation.min')">
                                This field should be at least 0 characters.
                            </small>
                            <small class="form-text text-danger" v-if="!$v.orderItem.totalPrice.number" v-text="$t('entity.validation.number')">
                                This field should be a number.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('storeApp.orderItem.status')" for="order-item-status">Status</label>
                        <select class="form-control" name="status" :class="{'valid': !$v.orderItem.status.$invalid, 'invalid': $v.orderItem.status.$invalid }" v-model="$v.orderItem.status.$model" id="order-item-status"  required>
                            <option value="AVAILABLE" v-bind:label="$t('storeApp.OrderItemStatus.AVAILABLE')">AVAILABLE</option>
                            <option value="OUT_OF_STOCK" v-bind:label="$t('storeApp.OrderItemStatus.OUT_OF_STOCK')">OUT_OF_STOCK</option>
                            <option value="BACK_ORDER" v-bind:label="$t('storeApp.OrderItemStatus.BACK_ORDER')">BACK_ORDER</option>
                        </select>
                        <div v-if="$v.orderItem.status.$anyDirty && $v.orderItem.status.$invalid">
                            <small class="form-text text-danger" v-if="!$v.orderItem.status.required" v-text="$t('entity.validation.required')">
                                This field is required.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-bind:value="$t('storeApp.orderItem.product')" for="order-item-product">Product</label>
                        <select class="form-control" id="order-item-product" name="product" v-model="orderItem.product"  required>
                            <option v-if="!order-item.product" v-bind:value="null" selected></option>
                            <option v-bind:value="orderItem.product && productOption.id === orderItem.product.id ? orderItem.product : productOption" v-for="productOption in products" :key="productOption.id">{{productOption.name}}</option>
                        </select>
                    </div>
                    <div v-if="$v.orderItem.productId.$anyDirty && $v.orderItem.productId.$invalid">
                        <small class="form-text text-danger" v-if="!$v.orderItem.productId.required" v-text="$t('entity.validation.required')">
                            This field is required.
                        </small>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-bind:value="$t('storeApp.orderItem.order')" for="order-item-order">Order</label>
                        <select class="form-control" id="order-item-order" name="order" v-model="orderItem.order"  required>
                            <option v-if="!order-item.order" v-bind:value="null" selected></option>
                            <option v-bind:value="orderItem.order && productOrderOption.id === orderItem.order.id ? orderItem.order : productOrderOption" v-for="productOrderOption in productOrders" :key="productOrderOption.id">{{productOrderOption.code}}</option>
                        </select>
                    </div>
                    <div v-if="$v.orderItem.orderId.$anyDirty && $v.orderItem.orderId.$invalid">
                        <small class="form-text text-danger" v-if="!$v.orderItem.orderId.required" v-text="$t('entity.validation.required')">
                            This field is required.
                        </small>
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.orderItem.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./order-item-update.component.ts">
</script>
