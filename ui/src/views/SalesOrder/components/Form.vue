<template>
	<FormContainer
		class="form"
		:visible
		:title="props.isEdit ? 'Update SalesOrder' : 'Create SalesOrder'"
		:as-dialog
		@close="emit('close')">
		<form @submit.prevent="submit">
			<FormInput
				v-if="!props.hideInputs?.includes('order_number')"
				:required="true"
				:error-message="formErrors.order_number"
				label="Order Number">
				<InputText
					v-model="formData.order_number"
					:disabled="!!props.forceValues.order_number" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('order_date')"
				:required="true"
				:error-message="formErrors.order_date"
				label="Order Date">
				<DatePicker
					:model-value="formData.order_date ? new Date(formData.order_date) : undefined"
					:disabled="!!props.forceValues.order_date"
					selectionMode="single"
					@update:model-value="formData.order_date = ($event as Date).toISOString()" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('quantity')"
				:required="true"
				:error-message="formErrors.quantity"
				label="Quantity">
				<InputNumber
					v-model="formData.quantity"
					:disabled="!!props.forceValues.quantity" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('unit_price')"
				:required="true"
				:error-message="formErrors.unit_price"
				label="Unit Price">
				<InputNumber
					v-model="formData.unit_price"
					:disabled="!!props.forceValues.unit_price"
					:max-fraction-digits="2"
					:max="10000000000" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('total_amount')"
				:required="true"
				:error-message="formErrors.total_amount"
				label="Total Amount">
				<InputNumber
					v-model="formData.total_amount"
					:disabled="!!props.forceValues.total_amount"
					:max-fraction-digits="2"
					:max="10000000000" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('car_model_id')"
				:required="false"
				:error-message="formErrors.car_model_id"
				label="Car Model">
				<ModelSelect
					v-model="formData.car_model_id"
					:api="new CarModelsApi()"
					:disabled="!!props.forceValues.car_model_id"
					option-label="model_name" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('customer_id')"
				:required="false"
				:error-message="formErrors.customer_id"
				label="Customer">
				<ModelSelect
					v-model="formData.customer_id"
					:api="new CustomersApi()"
					:disabled="!!props.forceValues.customer_id"
					option-label="company_name" />
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
						{ title: 'CONFIRMED', value: 'CONFIRMED' },
						{ title: 'SHIPPED', value: 'SHIPPED' },
						{ title: 'COMPLETED', value: 'COMPLETED' },
						{ title: 'CANCELLED', value: 'CANCELLED' },
					]"
					:show-clear="false"
					:disabled="!!props.forceValues.status"
					option-label="title"
					option-value="value" />
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
import SalesOrdersApi from '@/models/SalesOrder/Api'
import type { SalesOrder } from '@/models/SalesOrder/Model'
import { useForm } from '@/helpers/form'
import FormInput from '@/components/FormInput.vue'
import Button from 'primevue/button'
import FormContainer from '@/components/FormContainer.vue'
import CarModelsApi from '@/models/CarModel/Api'
import CustomersApi from '@/models/Customer/Api'
import DatePicker from 'primevue/datepicker'
import InputNumber from 'primevue/inputnumber'
import InputText from 'primevue/inputtext'
import ModelSelect from '@/components/ModelSelect.vue'
import Select from 'primevue/select'

type FormData = {
	order_number: string
	order_date: string
	quantity: number
	unit_price: number
	total_amount: number
	car_model_id: number | undefined
	customer_id: number | undefined
	status: SalesOrder['status']
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
		id?: SalesOrder['id']
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
	api: () => new SalesOrdersApi(),
	defaultData: () =>
		({
			order_number: '',
			order_date: '',
			quantity: 0,
			unit_price: 0,
			total_amount: 0,
			car_model_id: undefined,
			customer_id: undefined,
			status: 'PENDING',
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
			router.push({ name: 'sales-orders-edit', params: { id: entity!.id } })
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
