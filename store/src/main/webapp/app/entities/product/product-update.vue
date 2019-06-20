<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="storeApp.product.home.createOrEditLabel" v-text="$t('storeApp.product.home.createOrEditLabel')">Create or edit a Product</h2>
                <div>
                    <div class="form-group" v-if="product.id">
                        <label for="id" v-text="$t('global.field.id')">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="product.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('storeApp.product.name')" for="product-name">Name</label>
                        <input type="text" class="form-control" name="name" id="product-name"
                            :class="{'valid': !$v.product.name.$invalid, 'invalid': $v.product.name.$invalid }" v-model="$v.product.name.$model"  required/>
                        <div v-if="$v.product.name.$anyDirty && $v.product.name.$invalid">
                            <small class="form-text text-danger" v-if="!$v.product.name.required" v-text="$t('entity.validation.required')">
                                This field is required.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('storeApp.product.description')" for="product-description">Description</label>
                        <input type="text" class="form-control" name="description" id="product-description"
                            :class="{'valid': !$v.product.description.$invalid, 'invalid': $v.product.description.$invalid }" v-model="$v.product.description.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('storeApp.product.price')" for="product-price">Price</label>
                        <input type="number" class="form-control" name="price" id="product-price"
                            :class="{'valid': !$v.product.price.$invalid, 'invalid': $v.product.price.$invalid }" v-model.number="$v.product.price.$model"  required/>
                        <div v-if="$v.product.price.$anyDirty && $v.product.price.$invalid">
                            <small class="form-text text-danger" v-if="!$v.product.price.required" v-text="$t('entity.validation.required')">
                                This field is required.
                            </small>
                            <small class="form-text text-danger" v-if="!$v.product.price.minLength" v-bind:value="$t('entity.validation.min')">
                                This field should be at least 0 characters.
                            </small>
                            <small class="form-text text-danger" v-if="!$v.product.price.number" v-text="$t('entity.validation.number')">
                                This field should be a number.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('storeApp.product.size')" for="product-size">Size</label>
                        <select class="form-control" name="size" :class="{'valid': !$v.product.size.$invalid, 'invalid': $v.product.size.$invalid }" v-model="$v.product.size.$model" id="product-size"  required>
                            <option value="S" v-bind:label="$t('storeApp.Size.S')">S</option>
                            <option value="M" v-bind:label="$t('storeApp.Size.M')">M</option>
                            <option value="L" v-bind:label="$t('storeApp.Size.L')">L</option>
                            <option value="XL" v-bind:label="$t('storeApp.Size.XL')">XL</option>
                            <option value="XXL" v-bind:label="$t('storeApp.Size.XXL')">XXL</option>
                        </select>
                        <div v-if="$v.product.size.$anyDirty && $v.product.size.$invalid">
                            <small class="form-text text-danger" v-if="!$v.product.size.required" v-text="$t('entity.validation.required')">
                                This field is required.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('storeApp.product.image')" for="product-image">Image</label>
                        <div>
                            <img v-bind:src="'data:' + product.imageContentType + ';base64,' + product.image" style="max-height: 100px;" v-if="product.image" alt="product image"/>
                            <div v-if="product.image" class="form-text text-danger clearfix">
                                <span class="pull-left">{{product.imageContentType}}, {{byteSize(product.image)}}</span>
                                <button type="button" v-on:click="clearInputImage('image', 'imageContentType', 'file_image')" class="btn btn-secondary btn-xs pull-right">
                                    <font-awesome-icon icon="times"></font-awesome-icon>
                                </button>
                            </div>
                            <input type="file" ref="file_image" id="file_image" v-on:change="setFileData($event, product, 'image', true)" accept="image/*" v-text="$t('entity.action.addimage')"/>
                        </div>
                        <input type="hidden" class="form-control" name="image" id="product-image"
                            :class="{'valid': !$v.product.image.$invalid, 'invalid': $v.product.image.$invalid }" v-model="$v.product.image.$model" />
                        <input type="hidden" class="form-control" name="imageContentType" id="product-imageContentType"
                            v-model="product.imageContentType" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-bind:value="$t('storeApp.product.productCategory')" for="product-productCategory">Product Category</label>
                        <select class="form-control" id="product-productCategory" name="productCategory" v-model="product.productCategory" >
                            <option v-bind:value="null"></option>
                            <option v-bind:value="product.productCategory && productCategoryOption.id === product.productCategory.id ? product.productCategory : productCategoryOption" v-for="productCategoryOption in productCategories" :key="productCategoryOption.id">{{productCategoryOption.name}}</option>
                        </select>
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.product.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./product-update.component.ts">
</script>
