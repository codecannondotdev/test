<template>
	<FormContainer
		class="form"
		:visible
		:title="props.isEdit ? 'Update ClaimAdjustment' : 'Create ClaimAdjustment'"
		:as-dialog
		@close="emit('close')">
		<form @submit.prevent="submit">
			<FormInput
				v-if="!props.hideInputs?.includes('adjustment_code')"
				:required="true"
				:error-message="formErrors.adjustment_code"
				label="Adjustment Code">
				<InputText
					v-model="formData.adjustment_code"
					:disabled="!!props.forceValues.adjustment_code" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('amount_adjusted')"
				:required="false"
				:error-message="formErrors.amount_adjusted"
				label="Amount Adjusted">
				<InputNumber
					v-model="formData.amount_adjusted"
					:disabled="!!props.forceValues.amount_adjusted"
					:max-fraction-digits="2"
					:max="10000000000" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('reason')"
				:required="false"
				:error-message="formErrors.reason"
				label="Reason">
				<Textarea
					v-model="formData.reason"
					:disabled="!!props.forceValues.reason"
					rows="5"
					cols="50" />
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
import ClaimAdjustmentsApi from '@/models/ClaimAdjustment/Api'
import type { ClaimAdjustment } from '@/models/ClaimAdjustment/Model'
import { useForm } from '@/helpers/form'
import FormInput from '@/components/FormInput.vue'
import Button from 'primevue/button'
import FormContainer from '@/components/FormContainer.vue'
import InputNumber from 'primevue/inputnumber'
import InputText from 'primevue/inputtext'
import InsuranceClaimsApi from '@/models/InsuranceClaim/Api'
import ModelSelect from '@/components/ModelSelect.vue'
import Textarea from 'primevue/textarea'

type FormData = {
	adjustment_code: string
	amount_adjusted: number | undefined
	reason: string | undefined
	insurance_claim_id: number | undefined
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
		id?: ClaimAdjustment['id']
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
	api: () => new ClaimAdjustmentsApi(),
	defaultData: () =>
		({
			adjustment_code: '',
			amount_adjusted: 0,
			reason: '',
			insurance_claim_id: undefined,
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
			router.push({ name: 'claim-adjustments-edit', params: { id: entity!.id } })
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
