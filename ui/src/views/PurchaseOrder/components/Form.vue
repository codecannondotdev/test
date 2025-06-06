<template>
	<FormContainer
		class="form"
		:visible
		:title="props.isEdit ? 'Update PurchaseOrder' : 'Create PurchaseOrder'"
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
				v-if="!props.hideInputs?.includes('quantity_ordered')"
				:required="true"
				:error-message="formErrors.quantity_ordered"
				label="Quantity Ordered">
				<InputNumber
					v-model="formData.quantity_ordered"
					:disabled="!!props.forceValues.quantity_ordered" />
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
				v-if="!props.hideInputs?.includes('total_cost')"
				:required="true"
				:error-message="formErrors.total_cost"
				label="Total Cost">
				<InputNumber
					v-model="formData.total_cost"
					:disabled="!!props.forceValues.total_cost"
					:max-fraction-digits="2"
					:max="10000000000" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('material_id')"
				:required="false"
				:error-message="formErrors.material_id"
				label="Material">
				<ModelSelect
					v-model="formData.material_id"
					:api="new MaterialsApi()"
					:disabled="!!props.forceValues.material_id"
					option-label="name" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('supplier_id')"
				:required="false"
				:error-message="formErrors.supplier_id"
				label="Supplier">
				<ModelSelect
					v-model="formData.supplier_id"
					:api="new SuppliersApi()"
					:disabled="!!props.forceValues.supplier_id"
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
						{ title: 'DELIVERED', value: 'DELIVERED' },
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
import PurchaseOrdersApi from '@/models/PurchaseOrder/Api'
import type { PurchaseOrder } from '@/models/PurchaseOrder/Model'
import { useForm } from '@/helpers/form'
import FormInput from '@/components/FormInput.vue'
import Button from 'primevue/button'
import FormContainer from '@/components/FormContainer.vue'
import DatePicker from 'primevue/datepicker'
import InputNumber from 'primevue/inputnumber'
import InputText from 'primevue/inputtext'
import MaterialsApi from '@/models/Material/Api'
import ModelSelect from '@/components/ModelSelect.vue'
import Select from 'primevue/select'
import SuppliersApi from '@/models/Supplier/Api'

type FormData = {
	order_number: string
	order_date: string
	quantity_ordered: number
	unit_price: number
	total_cost: number
	material_id: number | undefined
	supplier_id: number | undefined
	status: PurchaseOrder['status']
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
		id?: PurchaseOrder['id']
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
	api: () => new PurchaseOrdersApi(),
	defaultData: () =>
		({
			order_number: '',
			order_date: '',
			quantity_ordered: 0,
			unit_price: 0,
			total_cost: 0,
			material_id: undefined,
			supplier_id: undefined,
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
			router.push({ name: 'purchase-orders-edit', params: { id: entity!.id } })
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
