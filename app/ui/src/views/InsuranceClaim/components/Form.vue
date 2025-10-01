<template>
	<FormContainer
		class="form"
		:visible
		:title="props.isEdit ? 'Update InsuranceClaim' : 'Create InsuranceClaim'"
		:as-dialog
		@close="emit('close')">
		<form @submit.prevent="submit">
			<FormInput
				v-if="!props.hideInputs?.includes('claim_number')"
				:required="false"
				:error-message="formErrors.claim_number"
				label="Claim Number">
				<InputText
					v-model="formData.claim_number"
					:disabled="!!props.forceValues.claim_number" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('submission_date')"
				:required="false"
				:error-message="formErrors.submission_date"
				label="Submission Date">
				<DatePicker
					:model-value="formData.submission_date ? new Date(formData.submission_date) : undefined"
					:disabled="!!props.forceValues.submission_date"
					selectionMode="single"
					@update:model-value="formData.submission_date = ($event as Date | null)?.toISOString()" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('status')"
				:required="false"
				:error-message="formErrors.status"
				label="Status">
				<Select
					v-model="formData.status"
					:options="[
						{ title: 'Submitted', value: 'Submitted' },
						{ title: 'Accepted', value: 'Accepted' },
						{ title: 'Rejected', value: 'Rejected' },
						{ title: 'Adjusted', value: 'Adjusted' },
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
				v-if="!props.hideInputs?.includes('insurance_id')"
				:required="false"
				:error-message="formErrors.insurance_id"
				label="Insurance">
				<ModelSelect
					v-model="formData.insurance_id"
					:api="new InsurancesApi()"
					:disabled="!!props.forceValues.insurance_id"
					option-label="provider_name" />
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
import InsuranceClaimsApi from '@/models/InsuranceClaim/Api'
import type { InsuranceClaim } from '@/models/InsuranceClaim/Model'
import { useForm } from '@/helpers/form'
import FormInput from '@/components/FormInput.vue'
import Button from 'primevue/button'
import FormContainer from '@/components/FormContainer.vue'
import BillingAccountsApi from '@/models/BillingAccount/Api'
import DatePicker from 'primevue/datepicker'
import InputText from 'primevue/inputtext'
import InsurancesApi from '@/models/Insurance/Api'
import ModelSelect from '@/components/ModelSelect.vue'
import Select from 'primevue/select'

type FormData = {
	claim_number: string | undefined
	submission_date: string | undefined
	status: InsuranceClaim['status'] | undefined
	billing_account_id: number | undefined
	insurance_id: number | undefined
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
		id?: InsuranceClaim['id']
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
	api: () => new InsuranceClaimsApi(),
	defaultData: () =>
		({
			claim_number: '',
			submission_date: '',
			status: undefined,
			billing_account_id: undefined,
			insurance_id: undefined,
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
			router.push({ name: 'insurance-claims-edit', params: { id: entity!.id } })
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
