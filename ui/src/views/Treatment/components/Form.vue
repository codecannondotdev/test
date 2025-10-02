<template>
	<FormContainer
		class="form"
		:visible
		:title="props.isEdit ? 'Update Treatment' : 'Create Treatment'"
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
				v-if="!props.hideInputs?.includes('start_date')"
				:required="false"
				:error-message="formErrors.start_date"
				label="Start Date">
				<DatePicker
					:model-value="formData.start_date ? new Date(formData.start_date) : undefined"
					:disabled="!!props.forceValues.start_date"
					selectionMode="single"
					@update:model-value="formData.start_date = ($event as Date | null)?.toISOString()" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('end_date')"
				:required="false"
				:error-message="formErrors.end_date"
				label="End Date">
				<DatePicker
					:model-value="formData.end_date ? new Date(formData.end_date) : undefined"
					:disabled="!!props.forceValues.end_date"
					selectionMode="single"
					@update:model-value="formData.end_date = ($event as Date | null)?.toISOString()" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('outcome')"
				:required="false"
				:error-message="formErrors.outcome"
				label="Outcome">
				<Select
					v-model="formData.outcome"
					:options="[
						{ title: 'ONGOING', value: 'ONGOING' },
						{ title: 'RESOLVED', value: 'RESOLVED' },
						{ title: 'IMPROVED', value: 'IMPROVED' },
						{ title: 'NO CHANGE', value: 'NO CHANGE' },
						{ title: 'WORSENED', value: 'WORSENED' },
					]"
					:show-clear="true"
					:disabled="!!props.forceValues.outcome"
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
				v-if="!props.hideInputs?.includes('doctor_id')"
				:required="false"
				:error-message="formErrors.doctor_id"
				label="Doctor">
				<ModelSelect
					v-model="formData.doctor_id"
					:api="new DoctorsApi()"
					:disabled="!!props.forceValues.doctor_id"
					option-label="first_name" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('appointment_id')"
				:required="false"
				:error-message="formErrors.appointment_id"
				label="Appointment">
				<ModelSelect
					v-model="formData.appointment_id"
					:api="new AppointmentsApi()"
					:disabled="!!props.forceValues.appointment_id"
					option-label="appointment_date_time" />
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
import TreatmentsApi from '@/models/Treatment/Api'
import type { Treatment } from '@/models/Treatment/Model'
import { useForm } from '@/helpers/form'
import FormInput from '@/components/FormInput.vue'
import Button from 'primevue/button'
import FormContainer from '@/components/FormContainer.vue'
import AppointmentsApi from '@/models/Appointment/Api'
import DatePicker from 'primevue/datepicker'
import DoctorsApi from '@/models/Doctor/Api'
import InputText from 'primevue/inputtext'
import ModelSelect from '@/components/ModelSelect.vue'
import PatientsApi from '@/models/Patient/Api'
import Select from 'primevue/select'
import Textarea from 'primevue/textarea'

type FormData = {
	title: string
	description: string | undefined
	start_date: string | undefined
	end_date: string | undefined
	outcome: Treatment['outcome'] | undefined
	notes: string | undefined
	patient_id: number | undefined
	doctor_id: number | undefined
	appointment_id: number | undefined
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
		id?: Treatment['id']
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
	api: () => new TreatmentsApi(),
	defaultData: () =>
		({
			title: '',
			description: '',
			start_date: '',
			end_date: '',
			outcome: undefined,
			notes: '',
			patient_id: undefined,
			doctor_id: undefined,
			appointment_id: undefined,
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
			router.push({ name: 'treatments-edit', params: { id: entity!.id } })
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
