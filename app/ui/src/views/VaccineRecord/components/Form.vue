<template>
	<FormContainer
		class="form"
		:visible
		:title="props.isEdit ? 'Update VaccineRecord' : 'Create VaccineRecord'"
		:as-dialog
		@close="emit('close')">
		<form @submit.prevent="submit">
			<FormInput
				v-if="!props.hideInputs?.includes('vaccine_name')"
				:required="true"
				:error-message="formErrors.vaccine_name"
				label="Vaccine Name">
				<InputText
					v-model="formData.vaccine_name"
					:disabled="!!props.forceValues.vaccine_name" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('date_administered')"
				:required="true"
				:error-message="formErrors.date_administered"
				label="Date Administered">
				<DatePicker
					:model-value="
						formData.date_administered ? new Date(formData.date_administered) : undefined
					"
					:disabled="!!props.forceValues.date_administered"
					selectionMode="single"
					@update:model-value="formData.date_administered = ($event as Date).toISOString()" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('dose_number')"
				:required="false"
				:error-message="formErrors.dose_number"
				label="Dose Number">
				<InputNumber
					v-model="formData.dose_number"
					:disabled="!!props.forceValues.dose_number" />
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
				v-if="!props.hideInputs?.includes('immunization_id')"
				:required="false"
				:error-message="formErrors.immunization_id"
				label="Immunization">
				<ModelSelect
					v-model="formData.immunization_id"
					:api="new ImmunizationsApi()"
					:disabled="!!props.forceValues.immunization_id"
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
import VaccineRecordsApi from '@/models/VaccineRecord/Api'
import type { VaccineRecord } from '@/models/VaccineRecord/Model'
import { useForm } from '@/helpers/form'
import FormInput from '@/components/FormInput.vue'
import Button from 'primevue/button'
import FormContainer from '@/components/FormContainer.vue'
import DatePicker from 'primevue/datepicker'
import ImmunizationsApi from '@/models/Immunization/Api'
import InputNumber from 'primevue/inputnumber'
import InputText from 'primevue/inputtext'
import ModelSelect from '@/components/ModelSelect.vue'
import PatientsApi from '@/models/Patient/Api'

type FormData = {
	vaccine_name: string
	date_administered: string
	dose_number: number | undefined
	patient_id: number | undefined
	immunization_id: number | undefined
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
		id?: VaccineRecord['id']
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
	api: () => new VaccineRecordsApi(),
	defaultData: () =>
		({
			vaccine_name: '',
			date_administered: '',
			dose_number: 0,
			patient_id: undefined,
			immunization_id: undefined,
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
			router.push({ name: 'vaccine-records-edit', params: { id: entity!.id } })
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
