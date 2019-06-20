<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="storeApp.invoiceShipment.home.createOrEditLabel" v-text="$t('storeApp.invoiceShipment.home.createOrEditLabel')">Create or edit a Shipment</h2>
                <div>
                    <div class="form-group" v-if="shipment.id">
                        <label for="id" v-text="$t('global.field.id')">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="shipment.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('storeApp.invoiceShipment.trackingCode')" for="shipment-trackingCode">Tracking Code</label>
                        <input type="text" class="form-control" name="trackingCode" id="shipment-trackingCode"
                            :class="{'valid': !$v.shipment.trackingCode.$invalid, 'invalid': $v.shipment.trackingCode.$invalid }" v-model="$v.shipment.trackingCode.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('storeApp.invoiceShipment.date')" for="shipment-date">Date</label>
                        <div class="d-flex">
                            <input id="shipment-date" type="datetime-local" class="form-control" name="date" :class="{'valid': !$v.shipment.date.$invalid, 'invalid': $v.shipment.date.$invalid }"
                             required
                            :value="convertDateTimeFromServer($v.shipment.date.$model)"
                            @change="updateInstantField('date', $event)"/>
                        </div>
                        <div v-if="$v.shipment.date.$anyDirty && $v.shipment.date.$invalid">
                            <small class="form-text text-danger" v-if="!$v.shipment.date.required" v-text="$t('entity.validation.required')">
                                This field is required.
                            </small>
                            <small class="form-text text-danger" v-if="!$v.shipment.date.ZonedDateTimelocal" v-text="$t('entity.validation.ZonedDateTimelocal')">
                                This field should be a date and time.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('storeApp.invoiceShipment.details')" for="shipment-details">Details</label>
                        <input type="text" class="form-control" name="details" id="shipment-details"
                            :class="{'valid': !$v.shipment.details.$invalid, 'invalid': $v.shipment.details.$invalid }" v-model="$v.shipment.details.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-bind:value="$t('storeApp.invoiceShipment.invoice')" for="shipment-invoice">Invoice</label>
                        <select class="form-control" id="shipment-invoice" name="invoice" v-model="$v.shipment.invoiceId.$model"  required>
                            <option v-if="!shipment.invoice" v-bind:value="null" selected></option>
                            <option v-bind:value="invoiceOption.id" v-for="invoiceOption in invoices" :key="invoiceOption.id">{{invoiceOption.code}}</option>
                        </select>
                    </div>
                    <div v-if="$v.shipment.invoiceId.$anyDirty && $v.shipment.invoiceId.$invalid">
                        <small class="form-text text-danger" v-if="!$v.shipment.invoiceId.required" v-text="$t('entity.validation.required')">
                            This field is required.
                        </small>
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.shipment.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./shipment-update.component.ts">
</script>
