<template>
	<FormContainer
		class="form"
		:visible
		:title="props.isEdit ? 'Update Payment' : 'Create Payment'"
		:as-dialog
		@close="emit('close')">
		<form @submit.prevent="submit">
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
				v-if="!props.hideInputs?.includes('date')"
				:required="true"
				:error-message="formErrors.date"
				label="Date">
				<DatePicker
					:model-value="formData.date ? new Date(formData.date) : undefined"
					:disabled="!!props.forceValues.date"
					selectionMode="single"
					@update:model-value="formData.date = ($event as Date).toISOString()" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('method')"
				:required="false"
				:error-message="formErrors.method"
				label="Method">
				<Select
					v-model="formData.method"
					:options="[
						{ title: 'Cash', value: 'Cash' },
						{ title: 'Card', value: 'Card' },
						{ title: 'Check', value: 'Check' },
						{ title: 'Insurance', value: 'Insurance' },
						{ title: 'Online', value: 'Online' },
					]"
					:show-clear="true"
					:disabled="!!props.forceValues.method"
					option-label="title"
					option-value="value" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('reference')"
				:required="false"
				:error-message="formErrors.reference"
				label="Reference">
				<Textarea
					v-model="formData.reference"
					:disabled="!!props.forceValues.reference"
					rows="5"
					cols="50" />
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
				v-if="!props.hideInputs?.includes('invoice_id')"
				:required="false"
				:error-message="formErrors.invoice_id"
				label="Invoice">
				<ModelSelect
					v-model="formData.invoice_id"
					:api="new InvoicesApi()"
					:disabled="!!props.forceValues.invoice_id"
					option-label="invoice_number" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('payment_method_id')"
				:required="false"
				:error-message="formErrors.payment_method_id"
				label="Payment Method">
				<ModelSelect
					v-model="formData.payment_method_id"
					:api="new PaymentMethodsApi()"
					:disabled="!!props.forceValues.payment_method_id"
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
import PaymentsApi from '@/models/Payment/Api'
import type { Payment } from '@/models/Payment/Model'
import { useForm } from '@/helpers/form'
import FormInput from '@/components/FormInput.vue'
import Button from 'primevue/button'
import FormContainer from '@/components/FormContainer.vue'
import BillingAccountsApi from '@/models/BillingAccount/Api'
import CurrencysApi from '@/models/Currency/Api'
import DatePicker from 'primevue/datepicker'
import InputNumber from 'primevue/inputnumber'
import InputText from 'primevue/inputtext'
import InvoicesApi from '@/models/Invoice/Api'
import ModelSelect from '@/components/ModelSelect.vue'
import PaymentMethodsApi from '@/models/PaymentMethod/Api'
import Select from 'primevue/select'
import Textarea from 'primevue/textarea'

type FormData = {
	amount: number
	date: string
	method: Payment['method'] | undefined
	reference: string | undefined
	billing_account_id: number | undefined
	invoice_id: number | undefined
	payment_method_id: number | undefined
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
		id?: Payment['id']
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
	api: () => new PaymentsApi(),
	defaultData: () =>
		({
			amount: 0,
			date: '',
			method: undefined,
			reference: '',
			billing_account_id: undefined,
			invoice_id: undefined,
			payment_method_id: undefined,
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
			router.push({ name: 'payments-edit', params: { id: entity!.id } })
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
