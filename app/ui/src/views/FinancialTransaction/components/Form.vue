<template>
	<FormContainer
		class="form"
		:visible
		:title="props.isEdit ? 'Update FinancialTransaction' : 'Create FinancialTransaction'"
		:as-dialog
		@close="emit('close')">
		<form @submit.prevent="submit">
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
				v-if="!props.hideInputs?.includes('description')"
				:required="false"
				:error-message="formErrors.description"
				label="Description">
				<Textarea
					v-model="formData.description"
					:disabled="!!props.forceValues.description"
					rows="5"
					cols="50" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('ledger_account_id')"
				:required="false"
				:error-message="formErrors.ledger_account_id"
				label="Ledger Account">
				<ModelSelect
					v-model="formData.ledger_account_id"
					:api="new LedgerAccountsApi()"
					:disabled="!!props.forceValues.ledger_account_id"
					option-label="name" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('payment_id')"
				:required="false"
				:error-message="formErrors.payment_id"
				label="Payment">
				<ModelSelect
					v-model="formData.payment_id"
					:api="new PaymentsApi()"
					:disabled="!!props.forceValues.payment_id"
					option-label="date" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('claim_adjustment_id')"
				:required="false"
				:error-message="formErrors.claim_adjustment_id"
				label="Claim Adjustment">
				<ModelSelect
					v-model="formData.claim_adjustment_id"
					:api="new ClaimAdjustmentsApi()"
					:disabled="!!props.forceValues.claim_adjustment_id"
					option-label="adjustment_code" />
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
import FinancialTransactionsApi from '@/models/FinancialTransaction/Api'
import type { FinancialTransaction } from '@/models/FinancialTransaction/Model'
import { useForm } from '@/helpers/form'
import FormInput from '@/components/FormInput.vue'
import Button from 'primevue/button'
import FormContainer from '@/components/FormContainer.vue'
import ClaimAdjustmentsApi from '@/models/ClaimAdjustment/Api'
import DatePicker from 'primevue/datepicker'
import InputNumber from 'primevue/inputnumber'
import InputText from 'primevue/inputtext'
import LedgerAccountsApi from '@/models/LedgerAccount/Api'
import ModelSelect from '@/components/ModelSelect.vue'
import PaymentsApi from '@/models/Payment/Api'
import Textarea from 'primevue/textarea'

type FormData = {
	date: string
	amount: number
	description: string | undefined
	ledger_account_id: number | undefined
	payment_id: number | undefined
	claim_adjustment_id: number | undefined
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
		id?: FinancialTransaction['id']
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
	api: () => new FinancialTransactionsApi(),
	defaultData: () =>
		({
			date: '',
			amount: 0,
			description: '',
			ledger_account_id: undefined,
			payment_id: undefined,
			claim_adjustment_id: undefined,
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
			router.push({ name: 'financial-transactions-edit', params: { id: entity!.id } })
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
