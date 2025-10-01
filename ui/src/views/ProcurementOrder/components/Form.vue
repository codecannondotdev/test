<template>
	<FormContainer
		class="form"
		:visible
		:title="props.isEdit ? 'Update ProcurementOrder' : 'Create ProcurementOrder'"
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
				:required="false"
				:error-message="formErrors.order_date"
				label="Order Date">
				<DatePicker
					:model-value="formData.order_date ? new Date(formData.order_date) : undefined"
					:disabled="!!props.forceValues.order_date"
					selectionMode="single"
					@update:model-value="formData.order_date = ($event as Date | null)?.toISOString()" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('status')"
				:required="false"
				:error-message="formErrors.status"
				label="Status">
				<Select
					v-model="formData.status"
					:options="[
						{ title: 'Ordered', value: 'Ordered' },
						{ title: 'Received', value: 'Received' },
						{ title: 'Cancelled', value: 'Cancelled' },
					]"
					:show-clear="true"
					:disabled="!!props.forceValues.status"
					option-label="title"
					option-value="value" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('stock_id')"
				:required="false"
				:error-message="formErrors.stock_id"
				label="Stock">
				<ModelSelect
					v-model="formData.stock_id"
					:api="new MedicationStocksApi()"
					:disabled="!!props.forceValues.stock_id"
					option-label="batch_number" />
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
					option-label="name" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('donor_id')"
				:required="false"
				:error-message="formErrors.donor_id"
				label="Donor">
				<ModelSelect
					v-model="formData.donor_id"
					:api="new DonorsApi()"
					:disabled="!!props.forceValues.donor_id"
					option-label="name" />
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
import ProcurementOrdersApi from '@/models/ProcurementOrder/Api'
import type { ProcurementOrder } from '@/models/ProcurementOrder/Model'
import { useForm } from '@/helpers/form'
import FormInput from '@/components/FormInput.vue'
import Button from 'primevue/button'
import FormContainer from '@/components/FormContainer.vue'
import DatePicker from 'primevue/datepicker'
import DonorsApi from '@/models/Donor/Api'
import InputText from 'primevue/inputtext'
import MedicationStocksApi from '@/models/MedicationStock/Api'
import ModelSelect from '@/components/ModelSelect.vue'
import Select from 'primevue/select'
import SuppliersApi from '@/models/Supplier/Api'

type FormData = {
	order_number: string
	order_date: string | undefined
	status: ProcurementOrder['status'] | undefined
	stock_id: number | undefined
	supplier_id: number | undefined
	donor_id: number | undefined
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
		id?: ProcurementOrder['id']
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
	api: () => new ProcurementOrdersApi(),
	defaultData: () =>
		({
			order_number: '',
			order_date: '',
			status: undefined,
			stock_id: undefined,
			supplier_id: undefined,
			donor_id: undefined,
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
			router.push({ name: 'procurement-orders-edit', params: { id: entity!.id } })
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
