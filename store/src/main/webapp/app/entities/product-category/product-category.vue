<template>
    <div>
        <h2 id="page-heading">
            <span v-text="$t('storeApp.productCategory.home.title')" id="product-category-heading">Product Categories</span>
            <router-link :to="{name: 'ProductCategoryCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-product-category">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span  v-text="$t('storeApp.productCategory.home.createLabel')">
                    Create new ProductCategory
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
        <div class="table-responsive" v-if="productCategories">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th><span v-text="$t('global.field.id')">ID</span></th>
                    <th><span v-text="$t('storeApp.productCategory.name')">Name</span></th>
                    <th><span v-text="$t('storeApp.productCategory.description')">Description</span></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="productCategory in productCategories"
                    :key="productCategory.id">
                    <td>
                        <router-link :to="{name: 'ProductCategoryView', params: {productCategoryId: productCategory.id}}">{{productCategory.id}}</router-link>
                    </td>
                    <td>{{productCategory.name}}</td>
                    <td>{{productCategory.description}}</td>
                    <td class="text-right">
                        <div class="btn-group flex-btn-group-container">
                            <router-link :to="{name: 'ProductCategoryView', params: {productCategoryId: productCategory.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                            </router-link>
                            <router-link :to="{name: 'ProductCategoryEdit', params: {productCategoryId: productCategory.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(productCategory)"
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
            <span slot="modal-title"><span id="storeApp.productCategory.delete.question" v-text="$t('entity.delete.title')">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-productCategory-heading" v-bind:title="$t('storeApp.productCategory.delete.question')">Are you sure you want to delete this Product Category?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-productCategory" v-text="$t('entity.action.delete')" v-on:click="removeProductCategory()">Delete</button>
            </div>
        </b-modal>
    </div>
</template>

<script lang="ts" src="./product-category.component.ts">
</script>
