<template>
	<FormContainer
		class="form"
		:visible
		:title="props.isEdit ? 'Update Appointment' : 'Create Appointment'"
		:as-dialog
		@close="emit('close')">
		<form @submit.prevent="submit">
			<FormInput
				v-if="!props.hideInputs?.includes('appointment_date_time')"
				:required="true"
				:error-message="formErrors.appointment_date_time"
				label="Appointment Date Time">
				<DatePicker
					:model-value="
						formData.appointment_date_time ? new Date(formData.appointment_date_time) : undefined
					"
					:disabled="!!props.forceValues.appointment_date_time"
					:show-time="true"
					selectionMode="single"
					@update:model-value="formData.appointment_date_time = ($event as Date).toISOString()" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('duration_minutes')"
				:required="false"
				:error-message="formErrors.duration_minutes"
				label="Duration Minutes">
				<InputNumber
					v-model="formData.duration_minutes"
					:disabled="!!props.forceValues.duration_minutes" />
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
				v-if="!props.hideInputs?.includes('status')"
				:required="false"
				:error-message="formErrors.status"
				label="Status">
				<Select
					v-model="formData.status"
					:options="[
						{ title: 'SCHEDULED', value: 'SCHEDULED' },
						{ title: 'CONFIRMED', value: 'CONFIRMED' },
						{ title: 'CHECKED IN', value: 'CHECKED IN' },
						{ title: 'IN PROGRESS', value: 'IN PROGRESS' },
						{ title: 'COMPLETED', value: 'COMPLETED' },
						{ title: 'CANCELLED', value: 'CANCELLED' },
						{ title: 'NO-SHOW', value: 'NO-SHOW' },
					]"
					:show-clear="true"
					:disabled="!!props.forceValues.status"
					option-label="title"
					option-value="value" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('room')"
				:required="false"
				:error-message="formErrors.room"
				label="Room">
				<InputText
					v-model="formData.room"
					:disabled="!!props.forceValues.room" />
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
				v-if="!props.hideInputs?.includes('nurse_id')"
				:required="false"
				:error-message="formErrors.nurse_id"
				label="Nurse">
				<ModelSelect
					v-model="formData.nurse_id"
					:api="new NursesApi()"
					:disabled="!!props.forceValues.nurse_id"
					option-label="first_name" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('department_id')"
				:required="false"
				:error-message="formErrors.department_id"
				label="Department">
				<ModelSelect
					v-model="formData.department_id"
					:api="new DepartmentsApi()"
					:disabled="!!props.forceValues.department_id"
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
import AppointmentsApi from '@/models/Appointment/Api'
import type { Appointment } from '@/models/Appointment/Model'
import { useForm } from '@/helpers/form'
import FormInput from '@/components/FormInput.vue'
import Button from 'primevue/button'
import FormContainer from '@/components/FormContainer.vue'
import DatePicker from 'primevue/datepicker'
import DepartmentsApi from '@/models/Department/Api'
import DoctorsApi from '@/models/Doctor/Api'
import InputNumber from 'primevue/inputnumber'
import InputText from 'primevue/inputtext'
import ModelSelect from '@/components/ModelSelect.vue'
import NursesApi from '@/models/Nurse/Api'
import PatientsApi from '@/models/Patient/Api'
import Select from 'primevue/select'
import Textarea from 'primevue/textarea'

type FormData = {
	appointment_date_time: string
	duration_minutes: number | undefined
	reason: string | undefined
	status: Appointment['status'] | undefined
	room: string | undefined
	notes: string | undefined
	patient_id: number | undefined
	doctor_id: number | undefined
	nurse_id: number | undefined
	department_id: number | undefined
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
		id?: Appointment['id']
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
	api: () => new AppointmentsApi(),
	defaultData: () =>
		({
			appointment_date_time: '',
			duration_minutes: 0,
			reason: '',
			status: undefined,
			room: '',
			notes: '',
			patient_id: undefined,
			doctor_id: undefined,
			nurse_id: undefined,
			department_id: undefined,
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
			router.push({ name: 'appointments-edit', params: { id: entity!.id } })
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
