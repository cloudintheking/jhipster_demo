<template>
    <div class="row justify-content-center">
        <div class="col-8">
            <form name="editForm" role="form" novalidate v-on:submit.prevent="save()" >
                <h2 id="storeApp.notificationNotification.home.createOrEditLabel" v-text="$t('storeApp.notificationNotification.home.createOrEditLabel')">Create or edit a Notification</h2>
                <div>
                    <div class="form-group" v-if="notification.id">
                        <label for="id" v-text="$t('global.field.id')">ID</label>
                        <input type="text" class="form-control" id="id" name="id"
                               v-model="notification.id" readonly />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('storeApp.notificationNotification.date')" for="notification-date">Date</label>
                        <div class="d-flex">
                            <input id="notification-date" type="datetime-local" class="form-control" name="date" :class="{'valid': !$v.notification.date.$invalid, 'invalid': $v.notification.date.$invalid }"
                             required
                            :value="convertDateTimeFromServer($v.notification.date.$model)"
                            @change="updateInstantField('date', $event)"/>
                        </div>
                        <div v-if="$v.notification.date.$anyDirty && $v.notification.date.$invalid">
                            <small class="form-text text-danger" v-if="!$v.notification.date.required" v-text="$t('entity.validation.required')">
                                This field is required.
                            </small>
                            <small class="form-text text-danger" v-if="!$v.notification.date.ZonedDateTimelocal" v-text="$t('entity.validation.ZonedDateTimelocal')">
                                This field should be a date and time.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('storeApp.notificationNotification.details')" for="notification-details">Details</label>
                        <input type="text" class="form-control" name="details" id="notification-details"
                            :class="{'valid': !$v.notification.details.$invalid, 'invalid': $v.notification.details.$invalid }" v-model="$v.notification.details.$model" />
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('storeApp.notificationNotification.sentDate')" for="notification-sentDate">Sent Date</label>
                        <div class="d-flex">
                            <input id="notification-sentDate" type="datetime-local" class="form-control" name="sentDate" :class="{'valid': !$v.notification.sentDate.$invalid, 'invalid': $v.notification.sentDate.$invalid }"
                             required
                            :value="convertDateTimeFromServer($v.notification.sentDate.$model)"
                            @change="updateInstantField('sentDate', $event)"/>
                        </div>
                        <div v-if="$v.notification.sentDate.$anyDirty && $v.notification.sentDate.$invalid">
                            <small class="form-text text-danger" v-if="!$v.notification.sentDate.required" v-text="$t('entity.validation.required')">
                                This field is required.
                            </small>
                            <small class="form-text text-danger" v-if="!$v.notification.sentDate.ZonedDateTimelocal" v-text="$t('entity.validation.ZonedDateTimelocal')">
                                This field should be a date and time.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('storeApp.notificationNotification.format')" for="notification-format">Format</label>
                        <select class="form-control" name="format" :class="{'valid': !$v.notification.format.$invalid, 'invalid': $v.notification.format.$invalid }" v-model="$v.notification.format.$model" id="notification-format"  required>
                            <option value="EMAIL" v-bind:label="$t('storeApp.NotificationType.EMAIL')">EMAIL</option>
                            <option value="SMS" v-bind:label="$t('storeApp.NotificationType.SMS')">SMS</option>
                            <option value="PARCEL" v-bind:label="$t('storeApp.NotificationType.PARCEL')">PARCEL</option>
                        </select>
                        <div v-if="$v.notification.format.$anyDirty && $v.notification.format.$invalid">
                            <small class="form-text text-danger" v-if="!$v.notification.format.required" v-text="$t('entity.validation.required')">
                                This field is required.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('storeApp.notificationNotification.userId')" for="notification-userId">User Id</label>
                        <input type="number" class="form-control" name="userId" id="notification-userId"
                            :class="{'valid': !$v.notification.userId.$invalid, 'invalid': $v.notification.userId.$invalid }" v-model.number="$v.notification.userId.$model"  required/>
                        <div v-if="$v.notification.userId.$anyDirty && $v.notification.userId.$invalid">
                            <small class="form-text text-danger" v-if="!$v.notification.userId.required" v-text="$t('entity.validation.required')">
                                This field is required.
                            </small>
                            <small class="form-text text-danger" v-if="!$v.notification.userId.number" v-text="$t('entity.validation.number')">
                                This field should be a number.
                            </small>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" v-text="$t('storeApp.notificationNotification.productId')" for="notification-productId">Product Id</label>
                        <input type="number" class="form-control" name="productId" id="notification-productId"
                            :class="{'valid': !$v.notification.productId.$invalid, 'invalid': $v.notification.productId.$invalid }" v-model.number="$v.notification.productId.$model"  required/>
                        <div v-if="$v.notification.productId.$anyDirty && $v.notification.productId.$invalid">
                            <small class="form-text text-danger" v-if="!$v.notification.productId.required" v-text="$t('entity.validation.required')">
                                This field is required.
                            </small>
                            <small class="form-text text-danger" v-if="!$v.notification.productId.number" v-text="$t('entity.validation.number')">
                                This field should be a number.
                            </small>
                        </div>
                    </div>
                </div>
                <div>
                    <button type="button" id="cancel-save" class="btn btn-secondary" v-on:click="previousState()">
                        <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
                    </button>
                    <button type="submit" id="save-entity" :disabled="$v.notification.$invalid || isSaving" class="btn btn-primary">
                        <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script lang="ts" src="./notification-update.component.ts">
</script>
