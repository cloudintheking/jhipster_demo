<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <div v-if="productCategory">
                <h2 class="jh-entity-heading"><span v-text="$t('storeApp.productCategory.detail.title')">ProductCategory</span> {{productCategory.id}}</h2>
                <dl class="row jh-entity-details">
                    <dt>
                        <span v-text="$t('storeApp.productCategory.name')">Name</span>
                    </dt>
                    <dd>
                        <span>{{productCategory.name}}</span>
                    </dd>
                    <dt>
                        <span v-text="$t('storeApp.productCategory.description')">Description</span>
                    </dt>
                    <dd>
                        <span>{{productCategory.description}}</span>
                    </dd>
                </dl>
                <button type="submit"
                        v-on:click.prevent="previousState()"
                        class="btn btn-info">
                    <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
                </button>
                <router-link v-if="productCategory.id" :to="{name: 'ProductCategoryEdit', params: {productCategoryId: productCategory.id}}" tag="button" class="btn btn-primary">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./product-category-details.component.ts">
</script>
