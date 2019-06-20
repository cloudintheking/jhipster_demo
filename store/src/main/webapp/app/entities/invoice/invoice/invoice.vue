<template>
    <div>
        <h2 id="page-heading">
            <span v-text="$t('storeApp.invoiceInvoice.home.title')" id="invoice-heading">Invoices</span>
            <router-link :to="{name: 'InvoiceCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-invoice">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span  v-text="$t('storeApp.invoiceInvoice.home.createLabel')">
                    Create new Invoice
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
        <div class="table-responsive" v-if="invoices">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th v-on:click="changeOrder('id')"><span v-text="$t('global.field.id')">ID</span> <font-awesome-icon icon="sort"></font-awesome-icon></th>
                    <th v-on:click="changeOrder('code')"><span v-text="$t('storeApp.invoiceInvoice.code')">Code</span> <font-awesome-icon icon="sort"></font-awesome-icon></th>
                    <th v-on:click="changeOrder('date')"><span v-text="$t('storeApp.invoiceInvoice.date')">Date</span> <font-awesome-icon icon="sort"></font-awesome-icon></th>
                    <th v-on:click="changeOrder('details')"><span v-text="$t('storeApp.invoiceInvoice.details')">Details</span> <font-awesome-icon icon="sort"></font-awesome-icon></th>
                    <th v-on:click="changeOrder('status')"><span v-text="$t('storeApp.invoiceInvoice.status')">Status</span> <font-awesome-icon icon="sort"></font-awesome-icon></th>
                    <th v-on:click="changeOrder('paymentMethod')"><span v-text="$t('storeApp.invoiceInvoice.paymentMethod')">Payment Method</span> <font-awesome-icon icon="sort"></font-awesome-icon></th>
                    <th v-on:click="changeOrder('paymentDate')"><span v-text="$t('storeApp.invoiceInvoice.paymentDate')">Payment Date</span> <font-awesome-icon icon="sort"></font-awesome-icon></th>
                    <th v-on:click="changeOrder('paymentAmount')"><span v-text="$t('storeApp.invoiceInvoice.paymentAmount')">Payment Amount</span> <font-awesome-icon icon="sort"></font-awesome-icon></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="invoice of orderBy(invoices, propOrder, reverse === true ? 1 : -1)"
                    :key="invoice.id">
                    <td>
                        <router-link :to="{name: 'InvoiceView', params: {invoiceId: invoice.id}}">{{invoice.id}}</router-link>
                    </td>
                    <td>{{invoice.code}}</td>
                    <td>{{invoice.date | formatDate}}</td>
                    <td>{{invoice.details}}</td>
                    <td v-text="$t('storeApp.InvoiceStatus.' + invoice.status)">{{invoice.status}}</td>
                    <td v-text="$t('storeApp.PaymentMethod.' + invoice.paymentMethod)">{{invoice.paymentMethod}}</td>
                    <td>{{invoice.paymentDate | formatDate}}</td>
                    <td>{{invoice.paymentAmount}}</td>
                    <td class="text-right">
                        <div class="btn-group flex-btn-group-container">
                            <router-link :to="{name: 'InvoiceView', params: {invoiceId: invoice.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                            </router-link>
                            <router-link :to="{name: 'InvoiceEdit', params: {invoiceId: invoice.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(invoice)"
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
            <span slot="modal-title"><span id="storeApp.invoiceInvoice.delete.question" v-text="$t('entity.delete.title')">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-invoice-heading" v-bind:title="$t('storeApp.invoiceInvoice.delete.question')">Are you sure you want to delete this Invoice?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-invoice" v-text="$t('entity.action.delete')" v-on:click="removeInvoice()">Delete</button>
            </div>
        </b-modal>
        <div v-if="invoices && invoices.length">
            <div class="row justify-content-center">
                <jhi-item-count :page="page" :total="queryCount" :itemsPerPage="itemsPerPage"></jhi-item-count>
            </div>
            <div class="row justify-content-center">
                <b-pagination size="md" :total-rows="totalItems" v-model="page" :per-page="itemsPerPage" :change="loadPage(page)"></b-pagination>
            </div>
        </div>
    </div>
</template>

<script lang="ts" src="./invoice.component.ts">
</script>
