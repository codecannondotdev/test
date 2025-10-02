<template>
	<FormContainer
		class="form"
		:visible
		:title="props.isEdit ? 'Update Shipment' : 'Create Shipment'"
		:as-dialog
		@close="emit('close')">
		<form @submit.prevent="submit">
			<FormInput
				v-if="!props.hideInputs?.includes('shipment_date')"
				:required="true"
				:error-message="formErrors.shipment_date"
				label="Shipment Date">
				<DatePicker
					:model-value="formData.shipment_date ? new Date(formData.shipment_date) : undefined"
					:disabled="!!props.forceValues.shipment_date"
					selectionMode="single"
					@update:model-value="formData.shipment_date = ($event as Date).toISOString()" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('carrier')"
				:required="true"
				:error-message="formErrors.carrier"
				label="Carrier">
				<InputText
					v-model="formData.carrier"
					:disabled="!!props.forceValues.carrier" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('tracking_number')"
				:required="false"
				:error-message="formErrors.tracking_number"
				label="Tracking Number">
				<InputText
					v-model="formData.tracking_number"
					:disabled="!!props.forceValues.tracking_number" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('order_id')"
				:required="false"
				:error-message="formErrors.order_id"
				label="Order">
				<ModelSelect
					v-model="formData.order_id"
					:api="new OrdersApi()"
					:disabled="!!props.forceValues.order_id"
					option-label="status" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('warehouse_id')"
				:required="false"
				:error-message="formErrors.warehouse_id"
				label="Warehouse">
				<ModelSelect
					v-model="formData.warehouse_id"
					:api="new WarehousesApi()"
					:disabled="!!props.forceValues.warehouse_id"
					option-label="name" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('shipping_method_id')"
				:required="false"
				:error-message="formErrors.shipping_method_id"
				label="Shipping Method">
				<ModelSelect
					v-model="formData.shipping_method_id"
					:api="new ShippingMethodsApi()"
					:disabled="!!props.forceValues.shipping_method_id"
					option-label="method_name" />
			</FormInput>
			<div class="form__footer-container">
				<Button
					v-if="props.isEdit && !props.hideRemove"
					severity="danger"
					icon="fal fa-trash"
					label="Remove"
					outlined
					:loading="loading"
					@click="remove" />
				<Button
					icon="fal fa-save"
					:loading="loading"
					:label="props.isEdit ? 'Update' : 'Create'"
					type="submit"
					@submit="submit" />
			</div>
		</form>
	</FormContainer>
</template>

<script setup lang="ts">
import { watch } from 'vue'
import { useRouter } from 'vue-router'
import ShipmentsApi from '@/models/Shipment/Api'
import type { Shipment } from '@/models/Shipment/Model'
import { useForm } from '@/helpers/form'
import FormInput from '@/components/FormInput.vue'
import Button from 'primevue/button'
import FormContainer from '@/components/FormContainer.vue'
import DatePicker from 'primevue/datepicker'
import InputText from 'primevue/inputtext'
import ModelSelect from '@/components/ModelSelect.vue'
import OrdersApi from '@/models/Order/Api'
import ShippingMethodsApi from '@/models/ShippingMethod/Api'
import WarehousesApi from '@/models/Warehouse/Api'

type FormData = {
	shipment_date: string
	carrier: string
	tracking_number: string | undefined
	order_id: number | undefined
	warehouse_id: number | undefined
	shipping_method_id: number | undefined
}

const emit = defineEmits([
	'start-loading',
	'stop-loading',
	'close',
	'created',
	'updated',
	'deleted',
])

const props = withDefaults(
	defineProps<{
		isEdit?: boolean
		id?: Shipment['id']
		hideInputs?: (keyof FormData)[]
		defaultValues?: Partial<FormData>
		forceValues?: Partial<FormData>
		shouldRedirect?: boolean
		attachTo?: Record<string, { method: 'associate' | 'syncWithoutDetaching'; id: string | number }>
		asDialog?: boolean
		visible?: boolean
		hideRemove?: boolean
	}>(),
	{
		id: undefined,
		hideInputs: () => [],
		defaultValues: () => ({}),
		forceValues: () => ({}),
		shouldRedirect: true,
		attachTo: undefined,
		asDialog: false,
		visible: false,
		hideRemove: false,
	},
)

const router = useRouter()
const { formData, loading, formErrors, reset, submit, remove } = useForm({
	api: () => new ShipmentsApi(),
	defaultData: () =>
		({
			shipment_date: '',
			carrier: '',
			tracking_number: '',
			order_id: undefined,
			warehouse_id: undefined,
			shipping_method_id: undefined,
		}) satisfies FormData as FormData,
	forceValues: () => props.forceValues,
	attachTo: () => props.attachTo,
	isEdit: () => props.isEdit,
	id: () => props.id,
	onStartLoading: () => emit('start-loading'),
	onStopLoading: () => emit('stop-loading'),
	onClose: () => emit('close'),
	onCreated: (entity) => {
		if (props.shouldRedirect) {
			router.push({ name: 'shipments-edit', params: { id: entity!.id } })
		}
		emit('created', entity)
	},
	onUpdated: () => emit('updated'),
	onDeleted: () => emit('deleted'),
})

watch(() => props.visible, reset)
</script>

<style lang="scss">
.form {
	form {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 10px;

		& > * {
			width: 100%;
		}

		.form__footer-container {
			display: flex;
			justify-content: flex-end;
			align-items: center;
			gap: 10px;
		}

		&--edit {
			.form__footer-container {
				justify-content: space-between;
			}
		}
	}
}
</style>
