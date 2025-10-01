<template>
	<FormContainer
		class="form"
		:visible
		:title="props.isEdit ? 'Update Prescription' : 'Create Prescription'"
		:as-dialog
		@close="emit('close')">
		<form @submit.prevent="submit">
			<FormInput
				v-if="!props.hideInputs?.includes('dose')"
				:required="true"
				:error-message="formErrors.dose"
				label="Dose">
				<InputText
					v-model="formData.dose"
					:disabled="!!props.forceValues.dose" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('frequency')"
				:required="false"
				:error-message="formErrors.frequency"
				label="Frequency">
				<InputText
					v-model="formData.frequency"
					:disabled="!!props.forceValues.frequency" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('duration')"
				:required="false"
				:error-message="formErrors.duration"
				label="Duration">
				<InputText
					v-model="formData.duration"
					:disabled="!!props.forceValues.duration" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('instructions')"
				:required="false"
				:error-message="formErrors.instructions"
				label="Instructions">
				<Textarea
					v-model="formData.instructions"
					:disabled="!!props.forceValues.instructions"
					rows="5"
					cols="50" />
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
				v-if="!props.hideInputs?.includes('prescriber_id')"
				:required="false"
				:error-message="formErrors.prescriber_id"
				label="Prescriber">
				<ModelSelect
					v-model="formData.prescriber_id"
					:api="new DoctorsApi()"
					:disabled="!!props.forceValues.prescriber_id"
					option-label="first_name" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('medication_id')"
				:required="false"
				:error-message="formErrors.medication_id"
				label="Medication">
				<ModelSelect
					v-model="formData.medication_id"
					:api="new MedicationsApi()"
					:disabled="!!props.forceValues.medication_id"
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
import PrescriptionsApi from '@/models/Prescription/Api'
import type { Prescription } from '@/models/Prescription/Model'
import { useForm } from '@/helpers/form'
import FormInput from '@/components/FormInput.vue'
import Button from 'primevue/button'
import FormContainer from '@/components/FormContainer.vue'
import DoctorsApi from '@/models/Doctor/Api'
import InputText from 'primevue/inputtext'
import MedicationsApi from '@/models/Medication/Api'
import ModelSelect from '@/components/ModelSelect.vue'
import PatientsApi from '@/models/Patient/Api'
import Textarea from 'primevue/textarea'

type FormData = {
	dose: string
	frequency: string | undefined
	duration: string | undefined
	instructions: string | undefined
	patient_id: number | undefined
	prescriber_id: number | undefined
	medication_id: number | undefined
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
		id?: Prescription['id']
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
	api: () => new PrescriptionsApi(),
	defaultData: () =>
		({
			dose: '',
			frequency: '',
			duration: '',
			instructions: '',
			patient_id: undefined,
			prescriber_id: undefined,
			medication_id: undefined,
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
			router.push({ name: 'prescriptions-edit', params: { id: entity!.id } })
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
