<template>
    <div>
        <h2 id="page-heading">
            <span v-text="$t('storeApp.notificationNotification.home.title')" id="notification-heading">Notifications</span>
            <router-link :to="{name: 'NotificationCreate'}" tag="button" id="jh-create-entity" class="btn btn-primary float-right jh-create-entity create-notification">
                <font-awesome-icon icon="plus"></font-awesome-icon>
                <span  v-text="$t('storeApp.notificationNotification.home.createLabel')">
                    Create new Notification
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
        <div class="table-responsive" v-if="notifications">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th><span v-text="$t('global.field.id')">ID</span></th>
                    <th><span v-text="$t('storeApp.notificationNotification.date')">Date</span></th>
                    <th><span v-text="$t('storeApp.notificationNotification.details')">Details</span></th>
                    <th><span v-text="$t('storeApp.notificationNotification.sentDate')">Sent Date</span></th>
                    <th><span v-text="$t('storeApp.notificationNotification.format')">Format</span></th>
                    <th><span v-text="$t('storeApp.notificationNotification.userId')">User Id</span></th>
                    <th><span v-text="$t('storeApp.notificationNotification.productId')">Product Id</span></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="notification in notifications"
                    :key="notification.id">
                    <td>
                        <router-link :to="{name: 'NotificationView', params: {notificationId: notification.id}}">{{notification.id}}</router-link>
                    </td>
                    <td>{{notification.date | formatDate}}</td>
                    <td>{{notification.details}}</td>
                    <td>{{notification.sentDate | formatDate}}</td>
                    <td v-text="$t('storeApp.NotificationType.' + notification.format)">{{notification.format}}</td>
                    <td>{{notification.userId}}</td>
                    <td>{{notification.productId}}</td>
                    <td class="text-right">
                        <div class="btn-group flex-btn-group-container">
                            <router-link :to="{name: 'NotificationView', params: {notificationId: notification.id}}" tag="button" class="btn btn-info btn-sm details">
                                <font-awesome-icon icon="eye"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                            </router-link>
                            <router-link :to="{name: 'NotificationEdit', params: {notificationId: notification.id}}"  tag="button" class="btn btn-primary btn-sm edit">
                                <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                                <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                            </router-link>
                            <b-button v-on:click="prepareRemove(notification)"
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
            <span slot="modal-title"><span id="storeApp.notificationNotification.delete.question" v-text="$t('entity.delete.title')">Confirm delete operation</span></span>
            <div class="modal-body">
                <p id="jhi-delete-notification-heading" v-bind:title="$t('storeApp.notificationNotification.delete.question')">Are you sure you want to delete this Notification?</p>
            </div>
            <div slot="modal-footer">
                <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
                <button type="button" class="btn btn-primary" id="jhi-confirm-delete-notification" v-text="$t('entity.action.delete')" v-on:click="removeNotification()">Delete</button>
            </div>
        </b-modal>
    </div>
</template>

<script lang="ts" src="./notification.component.ts">
</script>
