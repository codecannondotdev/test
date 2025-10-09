<template>
	<FormContainer
		class="form"
		:visible
		:title="props.isEdit ? 'Update Expense' : 'Create Expense'"
		:as-dialog
		@close="emit('close')">
		<form @submit.prevent="submit">
			<FormInput
				v-if="!props.hideInputs?.includes('title')"
				:required="true"
				:error-message="formErrors.title"
				label="Title">
				<InputText
					v-model="formData.title"
					:disabled="!!props.forceValues.title" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('amount')"
				:required="true"
				:error-message="formErrors.amount"
				label="Amount">
				<InputNumber
					v-model="formData.amount"
					:disabled="!!props.forceValues.amount"
					:max-fraction-digits="2"
					:max="10000000000" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('currency')"
				:required="false"
				:error-message="formErrors.currency"
				label="Currency">
				<Select
					v-model="formData.currency"
					:options="[
						{ title: 'USD', value: 'USD' },
						{ title: 'EUR', value: 'EUR' },
						{ title: 'GBP', value: 'GBP' },
						{ title: 'JPY', value: 'JPY' },
						{ title: 'AUD', value: 'AUD' },
						{ title: 'CAD', value: 'CAD' },
						{ title: 'CHF', value: 'CHF' },
						{ title: 'CNY', value: 'CNY' },
					]"
					:show-clear="true"
					:disabled="!!props.forceValues.currency"
					option-label="title"
					option-value="value" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('date_incurred')"
				:required="true"
				:error-message="formErrors.date_incurred"
				label="Date Incurred">
				<DatePicker
					:model-value="formData.date_incurred ? new Date(formData.date_incurred) : undefined"
					:disabled="!!props.forceValues.date_incurred"
					selectionMode="single"
					@update:model-value="formData.date_incurred = ($event as Date).toISOString()" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('payment_date')"
				:required="false"
				:error-message="formErrors.payment_date"
				label="Payment Date">
				<DatePicker
					:model-value="formData.payment_date ? new Date(formData.payment_date) : undefined"
					:disabled="!!props.forceValues.payment_date"
					selectionMode="single"
					@update:model-value="formData.payment_date = ($event as Date | null)?.toISOString()" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('status')"
				:required="false"
				:error-message="formErrors.status"
				label="Status">
				<Select
					v-model="formData.status"
					:options="[
						{ title: 'DRAFT', value: 'DRAFT' },
						{ title: 'SUBMITTED', value: 'SUBMITTED' },
						{ title: 'APPROVED', value: 'APPROVED' },
						{ title: 'REIMBURSED', value: 'REIMBURSED' },
						{ title: 'DECLINED', value: 'DECLINED' },
					]"
					:show-clear="true"
					:disabled="!!props.forceValues.status"
					option-label="title"
					option-value="value" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('payment_method')"
				:required="false"
				:error-message="formErrors.payment_method"
				label="Payment Method">
				<Select
					v-model="formData.payment_method"
					:options="[
						{ title: 'CREDIT_CARD', value: 'CREDIT_CARD' },
						{ title: 'BANK_TRANSFER', value: 'BANK_TRANSFER' },
						{ title: 'CASH', value: 'CASH' },
						{ title: 'OTHER', value: 'OTHER' },
					]"
					:show-clear="true"
					:disabled="!!props.forceValues.payment_method"
					option-label="title"
					option-value="value" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('notes')"
				:required="false"
				:error-message="formErrors.notes"
				label="Notes">
				<Textarea
					v-model="formData.notes"
					:disabled="!!props.forceValues.notes"
					rows="5"
					cols="50" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('is_recurring')"
				:error-message="formErrors.is_recurring"
				label="Is Recurring">
				<template #prepend-input>
					<Checkbox
						v-model="formData.is_recurring"
						:disabled="!!props.forceValues.is_recurring"
						:binary="true" />
				</template>
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('receipt_attached')"
				:error-message="formErrors.receipt_attached"
				label="Receipt Attached">
				<template #prepend-input>
					<Checkbox
						v-model="formData.receipt_attached"
						:disabled="!!props.forceValues.receipt_attached"
						:binary="true" />
				</template>
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('category_id')"
				:required="false"
				:error-message="formErrors.category_id"
				label="Category">
				<ModelSelect
					v-model="formData.category_id"
					:api="new CategorysApi()"
					:disabled="!!props.forceValues.category_id"
					option-label="name" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('vendor_id')"
				:required="false"
				:error-message="formErrors.vendor_id"
				label="Vendor">
				<ModelSelect
					v-model="formData.vendor_id"
					:api="new VendorsApi()"
					:disabled="!!props.forceValues.vendor_id"
					option-label="name" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('project_id')"
				:required="false"
				:error-message="formErrors.project_id"
				label="Project">
				<ModelSelect
					v-model="formData.project_id"
					:api="new ProjectsApi()"
					:disabled="!!props.forceValues.project_id"
					option-label="name" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('budget_id')"
				:required="false"
				:error-message="formErrors.budget_id"
				label="Budget">
				<ModelSelect
					v-model="formData.budget_id"
					:api="new BudgetsApi()"
					:disabled="!!props.forceValues.budget_id"
					option-label="name" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('currency_id')"
				:required="false"
				:error-message="formErrors.currency_id"
				label="Currency">
				<ModelSelect
					v-model="formData.currency_id"
					:api="new CurrencysApi()"
					:disabled="!!props.forceValues.currency_id"
					option-label="code" />
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
import ExpensesApi from '@/models/Expense/Api'
import type { Expense } from '@/models/Expense/Model'
import { useForm } from '@/helpers/form'
import FormInput from '@/components/FormInput.vue'
import Button from 'primevue/button'
import FormContainer from '@/components/FormContainer.vue'
import BudgetsApi from '@/models/Budget/Api'
import CategorysApi from '@/models/Category/Api'
import Checkbox from 'primevue/checkbox'
import CurrencysApi from '@/models/Currency/Api'
import DatePicker from 'primevue/datepicker'
import InputNumber from 'primevue/inputnumber'
import InputText from 'primevue/inputtext'
import ModelSelect from '@/components/ModelSelect.vue'
import ProjectsApi from '@/models/Project/Api'
import Select from 'primevue/select'
import Textarea from 'primevue/textarea'
import VendorsApi from '@/models/Vendor/Api'

type FormData = {
	title: string
	amount: number
	currency: Expense['currency'] | undefined
	date_incurred: string
	payment_date: string | undefined
	status: Expense['status'] | undefined
	payment_method: Expense['payment_method'] | undefined
	notes: string | undefined
	is_recurring: boolean
	receipt_attached: boolean
	category_id: number | undefined
	vendor_id: number | undefined
	project_id: number | undefined
	budget_id: number | undefined
	currency_id: number | undefined
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
		id?: Expense['id']
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
	api: () => new ExpensesApi(),
	defaultData: () =>
		({
			title: '',
			amount: 0,
			currency: undefined,
			date_incurred: '',
			payment_date: '',
			status: undefined,
			payment_method: undefined,
			notes: '',
			is_recurring: false,
			receipt_attached: false,
			category_id: undefined,
			vendor_id: undefined,
			project_id: undefined,
			budget_id: undefined,
			currency_id: undefined,
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
			router.push({ name: 'expenses-edit', params: { id: entity!.id } })
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
