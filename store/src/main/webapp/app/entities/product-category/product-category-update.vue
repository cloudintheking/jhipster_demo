<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="storeApp.productCategory.home.createOrEditLabel" v-text="$t('storeApp.productCategory.home.createOrEditLabel')">Create or edit a ProductCategory</h2>
                <div>
                    <div class="form-group" v-if="productCategory.id">
                        <label for="id" v-text="$t('global.field.id')">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="productCategory.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('storeApp.productCategory.name')" for="product-category-name">Name</label>
                        <input type="text" class="form-control" name="name" id="product-category-name"
                            :class="{'valid': !$v.productCategory.name.$invalid, 'invalid': $v.productCategory.name.$invalid }" v-model="$v.productCategory.name.$model"  required/>
                        <div v-if="$v.productCategory.name.$anyDirty && $v.productCategory.name.$invalid">
                            <small class="form-text text-danger" v-if="!$v.productCategory.name.required" v-text="$t('entity.validation.required')">
                                This field is required.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('storeApp.productCategory.description')" for="product-category-description">Description</label>
                        <input type="text" class="form-control" name="description" id="product-category-description"
                            :class="{'valid': !$v.productCategory.description.$invalid, 'invalid': $v.productCategory.description.$invalid }" v-model="$v.productCategory.description.$model" />
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.productCategory.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./product-category-update.component.ts">
</script>
