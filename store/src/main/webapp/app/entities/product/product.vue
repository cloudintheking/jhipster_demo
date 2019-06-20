<template>
    <div>
        <h2 id="page-heading">
            <span v-text="$t('storeApp.product.home.title')" id="product-heading">Products</span>
            <router-link :to="{name: 'ProductCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-product">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span  v-text="$t('storeApp.product.home.createLabel')">
                    Create new Product
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
        <div class="table-responsive" v-if="products">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th v-on:click="changeOrder('id')"><span v-text="$t('global.field.id')">ID</span> <font-awesome-icon icon="sort"></font-awesome-icon></th>
                    <th v-on:click="changeOrder('name')"><span v-text="$t('storeApp.product.name')">Name</span> <font-awesome-icon icon="sort"></font-awesome-icon></th>
                    <th v-on:click="changeOrder('description')"><span v-text="$t('storeApp.product.description')">Description</span> <font-awesome-icon icon="sort"></font-awesome-icon></th>
                    <th v-on:click="changeOrder('price')"><span v-text="$t('storeApp.product.price')">Price</span> <font-awesome-icon icon="sort"></font-awesome-icon></th>
                    <th v-on:click="changeOrder('size')"><span v-text="$t('storeApp.product.size')">Size</span> <font-awesome-icon icon="sort"></font-awesome-icon></th>
                    <th v-on:click="changeOrder('image')"><span v-text="$t('storeApp.product.image')">Image</span> <font-awesome-icon icon="sort"></font-awesome-icon></th>
                    <th v-on:click="changeOrder('productCategory.name')"><span v-text="$t('storeApp.product.productCategory')">Product Category</span> <font-awesome-icon icon="sort"></font-awesome-icon></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="product of orderBy(products, propOrder, reverse === true ? 1 : -1)"
                    :key="product.id">
                    <td>
                        <router-link :to="{name: 'ProductView', params: {productId: product.id}}">{{product.id}}</router-link>
                    </td>
                    <td>{{product.name}}</td>
                    <td>{{product.description}}</td>
                    <td>{{product.price}}</td>
                    <td v-text="$t('storeApp.Size.' + product.size)">{{product.size}}</td>
                    <td>
                        <a v-if="product.image" v-on:click="openFile(product.imageContentType, product.image)">
                            <img v-bind:src="'data:' + product.imageContentType + ';base64,' + product.image" style="max-height: 30px;" alt="product image"/>
                        </a>
                        <span v-if="product.image">{{product.imageContentType}}, {{byteSize(product.image)}}</span>
                    </td>
                    <td>
                        <div v-if="product.productCategory">
                            <router-link :to="{name: 'ProductCategoryView', params: {productCategoryId: product.productCategory.id}}">{{product.productCategory.name}}</router-link>
                        </div>
                    </td>
                    <td class="text-right">
                        <div class="btn-group flex-btn-group-container">
                            <router-link :to="{name: 'ProductView', params: {productId: product.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                            </router-link>
                            <router-link :to="{name: 'ProductEdit', params: {productId: product.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(product)"
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
            <span slot="modal-title"><span id="storeApp.product.delete.question" v-text="$t('entity.delete.title')">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-product-heading" v-bind:title="$t('storeApp.product.delete.question')">Are you sure you want to delete this Product?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-product" v-text="$t('entity.action.delete')" v-on:click="removeProduct()">Delete</button>
            </div>
        </b-modal>
        <div v-if="products && products.length">
            <div class="row justify-content-center">
                <jhi-item-count :page="page" :total="queryCount" :itemsPerPage="itemsPerPage"></jhi-item-count>
            </div>
            <div class="row justify-content-center">
                <b-pagination size="md" :total-rows="totalItems" v-model="page" :per-page="itemsPerPage" :change="loadPage(page)"></b-pagination>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./product.component.ts">
</script>
