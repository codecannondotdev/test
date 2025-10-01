<template>
	<FormContainer
		class="form"
		:visible
		:title="props.isEdit ? 'Update Invoice' : 'Create Invoice'"
		:as-dialog
		@close="emit('close')">
		<form @submit.prevent="submit">
			<FormInput
				v-if="!props.hideInputs?.includes('invoice_number')"
				:required="true"
				:error-message="formErrors.invoice_number"
				label="Invoice Number">
				<InputText
					v-model="formData.invoice_number"
					:disabled="!!props.forceValues.invoice_number" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('issue_date')"
				:required="true"
				:error-message="formErrors.issue_date"
				label="Issue Date">
				<DatePicker
					:model-value="formData.issue_date ? new Date(formData.issue_date) : undefined"
					:disabled="!!props.forceValues.issue_date"
					selectionMode="single"
					@update:model-value="formData.issue_date = ($event as Date).toISOString()" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('due_date')"
				:required="false"
				:error-message="formErrors.due_date"
				label="Due Date">
				<DatePicker
					:model-value="formData.due_date ? new Date(formData.due_date) : undefined"
					:disabled="!!props.forceValues.due_date"
					selectionMode="single"
					@update:model-value="formData.due_date = ($event as Date | null)?.toISOString()" />
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
				v-if="!props.hideInputs?.includes('status')"
				:required="false"
				:error-message="formErrors.status"
				label="Status">
				<Select
					v-model="formData.status"
					:options="[
						{ title: 'DRAFT', value: 'DRAFT' },
						{ title: 'ISSUED', value: 'ISSUED' },
						{ title: 'PAID', value: 'PAID' },
						{ title: 'PARTIALLY PAID', value: 'PARTIALLY PAID' },
						{ title: 'VOIDED', value: 'VOIDED' },
					]"
					:show-clear="true"
					:disabled="!!props.forceValues.status"
					option-label="title"
					option-value="value" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('billing_account_id')"
				:required="false"
				:error-message="formErrors.billing_account_id"
				label="Billing Account">
				<ModelSelect
					v-model="formData.billing_account_id"
					:api="new BillingAccountsApi()"
					:disabled="!!props.forceValues.billing_account_id"
					option-label="account_number" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('insurance_claim_id')"
				:required="false"
				:error-message="formErrors.insurance_claim_id"
				label="Insurance Claim">
				<ModelSelect
					v-model="formData.insurance_claim_id"
					:api="new InsuranceClaimsApi()"
					:disabled="!!props.forceValues.insurance_claim_id"
					option-label="claim_number" />
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
			<FormInput
				v-if="!props.hideInputs?.includes('tax_rate_id')"
				:required="false"
				:error-message="formErrors.tax_rate_id"
				label="Tax Rate">
				<ModelSelect
					v-model="formData.tax_rate_id"
					:api="new TaxRatesApi()"
					:disabled="!!props.forceValues.tax_rate_id"
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
import InvoicesApi from '@/models/Invoice/Api'
import type { Invoice } from '@/models/Invoice/Model'
import { useForm } from '@/helpers/form'
import FormInput from '@/components/FormInput.vue'
import Button from 'primevue/button'
import FormContainer from '@/components/FormContainer.vue'
import BillingAccountsApi from '@/models/BillingAccount/Api'
import CurrencysApi from '@/models/Currency/Api'
import DatePicker from 'primevue/datepicker'
import InputNumber from 'primevue/inputnumber'
import InputText from 'primevue/inputtext'
import InsuranceClaimsApi from '@/models/InsuranceClaim/Api'
import ModelSelect from '@/components/ModelSelect.vue'
import Select from 'primevue/select'
import TaxRatesApi from '@/models/TaxRate/Api'

type FormData = {
	invoice_number: string
	issue_date: string
	due_date: string | undefined
	total_amount: number
	status: Invoice['status'] | undefined
	billing_account_id: number | undefined
	insurance_claim_id: number | undefined
	currency_id: number | undefined
	tax_rate_id: number | undefined
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
		id?: Invoice['id']
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
	api: () => new InvoicesApi(),
	defaultData: () =>
		({
			invoice_number: '',
			issue_date: '',
			due_date: '',
			total_amount: 0,
			status: undefined,
			billing_account_id: undefined,
			insurance_claim_id: undefined,
			currency_id: undefined,
			tax_rate_id: undefined,
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
			router.push({ name: 'invoices-edit', params: { id: entity!.id } })
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
