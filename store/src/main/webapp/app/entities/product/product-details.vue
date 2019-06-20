<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="product">
                <h2 class="jh-entity-heading"><span v-text="$t('storeApp.product.detail.title')">Product</span> {{product.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span v-text="$t('storeApp.product.name')">Name</span>
                    </dt>
                    <dd>
                        <span>{{product.name}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('storeApp.product.description')">Description</span>
                    </dt>
                    <dd>
                        <span>{{product.description}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('storeApp.product.price')">Price</span>
                    </dt>
                    <dd>
                        <span>{{product.price}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('storeApp.product.size')">Size</span>
                    </dt>
                    <dd>
                        <span v-text="$t('storeApp.Size.' + product.size)">{{product.size}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('storeApp.product.image')">Image</span>
                    </dt>
                    <dd>
                        <div v-if="product.image">
                            <a v-on:click="openFile(product.imageContentType, product.image)">
                                <img v-bind:src="'data:' + product.imageContentType + ';base64,' + product.image" style="max-width: 100%;" alt="product image"/>
                            </a>
                            {{product.imageContentType}}, {{byteSize(product.image)}}
                        </div>
                    </dd>
                    <dt>
                        <span v-text="$t('storeApp.product.productCategory')">Product Category</span>
                    </dt>
                    <dd>
                        <div v-if="product.productCategory">
                            <router-link :to="{name: 'ProductCategoryView', params: {productCategoryId: product.productCategory.id}}">{{product.productCategory.name}}</router-link>
                        </div>
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
                </button>
                <router-link v-if="product.id" :to="{name: 'ProductEdit', params: {productId: product.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./product-details.component.ts">
</script>
