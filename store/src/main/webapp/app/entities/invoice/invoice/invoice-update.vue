<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="storeApp.invoiceInvoice.home.createOrEditLabel" v-text="$t('storeApp.invoiceInvoice.home.createOrEditLabel')">Create or edit a Invoice</h2>
                <div>
                    <div class="form-group" v-if="invoice.id">
                        <label for="id" v-text="$t('global.field.id')">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="invoice.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('storeApp.invoiceInvoice.code')" for="invoice-code">Code</label>
                        <input type="text" class="form-control" name="code" id="invoice-code"
                            :class="{'valid': !$v.invoice.code.$invalid, 'invalid': $v.invoice.code.$invalid }" v-model="$v.invoice.code.$model"  required/>
                        <div v-if="$v.invoice.code.$anyDirty && $v.invoice.code.$invalid">
                            <small class="form-text text-danger" v-if="!$v.invoice.code.required" v-text="$t('entity.validation.required')">
                                This field is required.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('storeApp.invoiceInvoice.date')" for="invoice-date">Date</label>
                        <div class="d-flex">
                            <input id="invoice-date" type="datetime-local" class="form-control" name="date" :class="{'valid': !$v.invoice.date.$invalid, 'invalid': $v.invoice.date.$invalid }"
                             required
                            :value="convertDateTimeFromServer($v.invoice.date.$model)"
                            @change="updateInstantField('date', $event)"/>
                        </div>
                        <div v-if="$v.invoice.date.$anyDirty && $v.invoice.date.$invalid">
                            <small class="form-text text-danger" v-if="!$v.invoice.date.required" v-text="$t('entity.validation.required')">
                                This field is required.
                            </small>
                            <small class="form-text text-danger" v-if="!$v.invoice.date.ZonedDateTimelocal" v-text="$t('entity.validation.ZonedDateTimelocal')">
                                This field should be a date and time.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('storeApp.invoiceInvoice.details')" for="invoice-details">Details</label>
                        <input type="text" class="form-control" name="details" id="invoice-details"
                            :class="{'valid': !$v.invoice.details.$invalid, 'invalid': $v.invoice.details.$invalid }" v-model="$v.invoice.details.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('storeApp.invoiceInvoice.status')" for="invoice-status">Status</label>
                        <select class="form-control" name="status" :class="{'valid': !$v.invoice.status.$invalid, 'invalid': $v.invoice.status.$invalid }" v-model="$v.invoice.status.$model" id="invoice-status"  required>
                            <option value="PAID" v-bind:label="$t('storeApp.InvoiceStatus.PAID')">PAID</option>
                            <option value="ISSUED" v-bind:label="$t('storeApp.InvoiceStatus.ISSUED')">ISSUED</option>
                            <option value="CANCELLED" v-bind:label="$t('storeApp.InvoiceStatus.CANCELLED')">CANCELLED</option>
                        </select>
                        <div v-if="$v.invoice.status.$anyDirty && $v.invoice.status.$invalid">
                            <small class="form-text text-danger" v-if="!$v.invoice.status.required" v-text="$t('entity.validation.required')">
                                This field is required.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('storeApp.invoiceInvoice.paymentMethod')" for="invoice-paymentMethod">Payment Method</label>
                        <select class="form-control" name="paymentMethod" :class="{'valid': !$v.invoice.paymentMethod.$invalid, 'invalid': $v.invoice.paymentMethod.$invalid }" v-model="$v.invoice.paymentMethod.$model" id="invoice-paymentMethod"  required>
                            <option value="CREDIT_CARD" v-bind:label="$t('storeApp.PaymentMethod.CREDIT_CARD')">CREDIT_CARD</option>
                            <option value="CASH_ON_DELIVERY" v-bind:label="$t('storeApp.PaymentMethod.CASH_ON_DELIVERY')">CASH_ON_DELIVERY</option>
                            <option value="PAYPAL" v-bind:label="$t('storeApp.PaymentMethod.PAYPAL')">PAYPAL</option>
                        </select>
                        <div v-if="$v.invoice.paymentMethod.$anyDirty && $v.invoice.paymentMethod.$invalid">
                            <small class="form-text text-danger" v-if="!$v.invoice.paymentMethod.required" v-text="$t('entity.validation.required')">
                                This field is required.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('storeApp.invoiceInvoice.paymentDate')" for="invoice-paymentDate">Payment Date</label>
                        <div class="d-flex">
                            <input id="invoice-paymentDate" type="datetime-local" class="form-control" name="paymentDate" :class="{'valid': !$v.invoice.paymentDate.$invalid, 'invalid': $v.invoice.paymentDate.$invalid }"
                             required
                            :value="convertDateTimeFromServer($v.invoice.paymentDate.$model)"
                            @change="updateInstantField('paymentDate', $event)"/>
                        </div>
                        <div v-if="$v.invoice.paymentDate.$anyDirty && $v.invoice.paymentDate.$invalid">
                            <small class="form-text text-danger" v-if="!$v.invoice.paymentDate.required" v-text="$t('entity.validation.required')">
                                This field is required.
                            </small>
                            <small class="form-text text-danger" v-if="!$v.invoice.paymentDate.ZonedDateTimelocal" v-text="$t('entity.validation.ZonedDateTimelocal')">
                                This field should be a date and time.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('storeApp.invoiceInvoice.paymentAmount')" for="invoice-paymentAmount">Payment Amount</label>
                        <input type="number" class="form-control" name="paymentAmount" id="invoice-paymentAmount"
                            :class="{'valid': !$v.invoice.paymentAmount.$invalid, 'invalid': $v.invoice.paymentAmount.$invalid }" v-model.number="$v.invoice.paymentAmount.$model"  required/>
                        <div v-if="$v.invoice.paymentAmount.$anyDirty && $v.invoice.paymentAmount.$invalid">
                            <small class="form-text text-danger" v-if="!$v.invoice.paymentAmount.required" v-text="$t('entity.validation.required')">
                                This field is required.
                            </small>
                            <small class="form-text text-danger" v-if="!$v.invoice.paymentAmount.number" v-text="$t('entity.validation.number')">
                                This field should be a number.
                            </small>
                        </div>
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.invoice.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./invoice-update.component.ts">
</script>
