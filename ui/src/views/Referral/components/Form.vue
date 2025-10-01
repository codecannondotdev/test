<template>
	<FormContainer
		class="form"
		:visible
		:title="props.isEdit ? 'Update Referral' : 'Create Referral'"
		:as-dialog
		@close="emit('close')">
		<form @submit.prevent="submit">
			<FormInput
				v-if="!props.hideInputs?.includes('referral_source')"
				:required="false"
				:error-message="formErrors.referral_source"
				label="Referral Source">
				<InputText
					v-model="formData.referral_source"
					:disabled="!!props.forceValues.referral_source" />
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
				v-if="!props.hideInputs?.includes('date')"
				:required="false"
				:error-message="formErrors.date"
				label="Date">
				<DatePicker
					:model-value="formData.date ? new Date(formData.date) : undefined"
					:disabled="!!props.forceValues.date"
					selectionMode="single"
					@update:model-value="formData.date = ($event as Date | null)?.toISOString()" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('patient_id')"
				:required="false"
				:error-message="formErrors.patient_id"
				label="Patient">
				<ModelSelect
					v-model="formData.patient_id"
					:api="new PatientsApi()"
					:disabled="!!props.forceValues.patient_id"
					option-label="first_name" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('referring_provider_id')"
				:required="false"
				:error-message="formErrors.referring_provider_id"
				label="Referring Provider">
				<ModelSelect
					v-model="formData.referring_provider_id"
					:api="new DoctorsApi()"
					:disabled="!!props.forceValues.referring_provider_id"
					option-label="first_name" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('receiving_provider_id')"
				:required="false"
				:error-message="formErrors.receiving_provider_id"
				label="Receiving Provider">
				<ModelSelect
					v-model="formData.receiving_provider_id"
					:api="new DoctorsApi()"
					:disabled="!!props.forceValues.receiving_provider_id"
					option-label="first_name" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('referral_source_id')"
				:required="false"
				:error-message="formErrors.referral_source_id"
				label="Referral Source">
				<ModelSelect
					v-model="formData.referral_source_id"
					:api="new ReferralSourcesApi()"
					:disabled="!!props.forceValues.referral_source_id"
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
import ReferralsApi from '@/models/Referral/Api'
import type { Referral } from '@/models/Referral/Model'
import { useForm } from '@/helpers/form'
import FormInput from '@/components/FormInput.vue'
import Button from 'primevue/button'
import FormContainer from '@/components/FormContainer.vue'
import DatePicker from 'primevue/datepicker'
import DoctorsApi from '@/models/Doctor/Api'
import InputText from 'primevue/inputtext'
import ModelSelect from '@/components/ModelSelect.vue'
import PatientsApi from '@/models/Patient/Api'
import ReferralSourcesApi from '@/models/ReferralSource/Api'
import Textarea from 'primevue/textarea'

type FormData = {
	referral_source: string | undefined
	reason: string | undefined
	date: string | undefined
	patient_id: number | undefined
	referring_provider_id: number | undefined
	receiving_provider_id: number | undefined
	referral_source_id: number | undefined
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
		id?: Referral['id']
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
	api: () => new ReferralsApi(),
	defaultData: () =>
		({
			referral_source: '',
			reason: '',
			date: '',
			patient_id: undefined,
			referring_provider_id: undefined,
			receiving_provider_id: undefined,
			referral_source_id: undefined,
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
			router.push({ name: 'referrals-edit', params: { id: entity!.id } })
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
