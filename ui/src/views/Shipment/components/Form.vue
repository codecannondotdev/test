<template>
	<FormContainer
		class="form"
		:visible
		:title="props.isEdit ? 'Update Shipment' : 'Create Shipment'"
		:as-dialog
		@close="emit('close')">
		<form @submit.prevent="submit">
			<FormInput
				v-if="!props.hideInputs?.includes('shipment_number')"
				:required="true"
				:error-message="formErrors.shipment_number"
				label="Shipment Number">
				<InputText
					v-model="formData.shipment_number"
					:disabled="!!props.forceValues.shipment_number" />
			</FormInput>
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
				v-if="!props.hideInputs?.includes('quantity_shipped')"
				:required="true"
				:error-message="formErrors.quantity_shipped"
				label="Quantity Shipped">
				<InputNumber
					v-model="formData.quantity_shipped"
					:disabled="!!props.forceValues.quantity_shipped" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('destination')"
				:required="true"
				:error-message="formErrors.destination"
				label="Destination">
				<InputText
					v-model="formData.destination"
					:disabled="!!props.forceValues.destination" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('status')"
				:required="true"
				:error-message="formErrors.status"
				label="Status">
				<Select
					v-model="formData.status"
					:options="[
						{ title: 'PENDING', value: 'PENDING' },
						{ title: 'IN TRANSIT', value: 'IN TRANSIT' },
						{ title: 'DELIVERED', value: 'DELIVERED' },
					]"
					:show-clear="false"
					:disabled="!!props.forceValues.status"
					option-label="title"
					option-value="value" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('carrier')"
				:required="false"
				:error-message="formErrors.carrier"
				label="Carrier">
				<InputText
					v-model="formData.carrier"
					:disabled="!!props.forceValues.carrier" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('sales_order_id')"
				:required="false"
				:error-message="formErrors.sales_order_id"
				label="Sales Order">
				<ModelSelect
					v-model="formData.sales_order_id"
					:api="new SalesOrdersApi()"
					:disabled="!!props.forceValues.sales_order_id"
					option-label="order_number" />
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
import InputNumber from 'primevue/inputnumber'
import InputText from 'primevue/inputtext'
import ModelSelect from '@/components/ModelSelect.vue'
import SalesOrdersApi from '@/models/SalesOrder/Api'
import Select from 'primevue/select'

type FormData = {
	shipment_number: string
	shipment_date: string
	quantity_shipped: number
	destination: string
	status: Shipment['status']
	carrier: string | undefined
	sales_order_id: number | undefined
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
			shipment_number: '',
			shipment_date: '',
			quantity_shipped: 0,
			destination: '',
			status: 'PENDING',
			carrier: '',
			sales_order_id: undefined,
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
