<template>
	<FormContainer
		class="form"
		:visible
		:title="props.isEdit ? 'Update Appointment' : 'Create Appointment'"
		:as-dialog
		@close="emit('close')">
		<form @submit.prevent="submit">
			<FormInput
				v-if="!props.hideInputs?.includes('type')"
				:required="false"
				:error-message="formErrors.type"
				label="Type">
				<Select
					v-model="formData.type"
					:options="[
						{ title: 'Consultation', value: 'Consultation' },
						{ title: 'Follow-up', value: 'Follow-up' },
						{ title: 'Procedure', value: 'Procedure' },
						{ title: 'Telemedicine', value: 'Telemedicine' },
					]"
					:show-clear="true"
					:disabled="!!props.forceValues.type"
					option-label="title"
					option-value="value" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('start_time')"
				:required="true"
				:error-message="formErrors.start_time"
				label="Start Time">
				<DatePicker
					:model-value="formData.start_time ? new Date(formData.start_time) : undefined"
					:disabled="!!props.forceValues.start_time"
					:show-time="true"
					selectionMode="single"
					@update:model-value="formData.start_time = ($event as Date).toISOString()" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('end_time')"
				:required="true"
				:error-message="formErrors.end_time"
				label="End Time">
				<DatePicker
					:model-value="formData.end_time ? new Date(formData.end_time) : undefined"
					:disabled="!!props.forceValues.end_time"
					:show-time="true"
					selectionMode="single"
					@update:model-value="formData.end_time = ($event as Date).toISOString()" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('status')"
				:required="false"
				:error-message="formErrors.status"
				label="Status">
				<Select
					v-model="formData.status"
					:options="[
						{ title: 'Scheduled', value: 'Scheduled' },
						{ title: 'Completed', value: 'Completed' },
						{ title: 'Cancelled', value: 'Cancelled' },
						{ title: 'No-show', value: 'No-show' },
					]"
					:show-clear="true"
					:disabled="!!props.forceValues.status"
					option-label="title"
					option-value="value" />
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
				v-if="!props.hideInputs?.includes('location')"
				:required="false"
				:error-message="formErrors.location"
				label="Location">
				<Textarea
					v-model="formData.location"
					:disabled="!!props.forceValues.location"
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
			<FormInput
				v-if="!props.hideInputs?.includes('discharge_id')"
				:required="false"
				:error-message="formErrors.discharge_id"
				label="Discharge">
				<ModelSelect
					v-model="formData.discharge_id"
					:api="new DischargesApi()"
					:disabled="!!props.forceValues.discharge_id"
					option-label="discharge_date" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('location_id')"
				:required="false"
				:error-message="formErrors.location_id"
				label="Location">
				<ModelSelect
					v-model="formData.location_id"
					:api="new RoomsApi()"
					:disabled="!!props.forceValues.location_id"
					option-label="room_number" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('queue_id')"
				:required="false"
				:error-message="formErrors.queue_id"
				label="Queue">
				<ModelSelect
					v-model="formData.queue_id"
					:api="new QueuesApi()"
					:disabled="!!props.forceValues.queue_id"
					option-label="name" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('type_id')"
				:required="false"
				:error-message="formErrors.type_id"
				label="Type">
				<ModelSelect
					v-model="formData.type_id"
					:api="new AppointmentTypesApi()"
					:disabled="!!props.forceValues.type_id"
					option-label="name" />
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
import AppointmentsApi from '@/models/Appointment/Api'
import type { Appointment } from '@/models/Appointment/Model'
import { useForm } from '@/helpers/form'
import FormInput from '@/components/FormInput.vue'
import Button from 'primevue/button'
import FormContainer from '@/components/FormContainer.vue'
import AppointmentTypesApi from '@/models/AppointmentType/Api'
import DatePicker from 'primevue/datepicker'
import DepartmentsApi from '@/models/Department/Api'
import DischargesApi from '@/models/Discharge/Api'
import DoctorsApi from '@/models/Doctor/Api'
import InputText from 'primevue/inputtext'
import ModelSelect from '@/components/ModelSelect.vue'
import NursesApi from '@/models/Nurse/Api'
import PatientsApi from '@/models/Patient/Api'
import QueuesApi from '@/models/Queue/Api'
import ReferralSourcesApi from '@/models/ReferralSource/Api'
import RoomsApi from '@/models/Room/Api'
import Select from 'primevue/select'
import Textarea from 'primevue/textarea'

type FormData = {
	type: Appointment['type'] | undefined
	start_time: string
	end_time: string
	status: Appointment['status'] | undefined
	reason: string | undefined
	location: string | undefined
	patient_id: number | undefined
	doctor_id: number | undefined
	nurse_id: number | undefined
	department_id: number | undefined
	discharge_id: number | undefined
	location_id: number | undefined
	queue_id: number | undefined
	type_id: number | undefined
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
			type: undefined,
			start_time: '',
			end_time: '',
			status: undefined,
			reason: '',
			location: '',
			patient_id: undefined,
			doctor_id: undefined,
			nurse_id: undefined,
			department_id: undefined,
			discharge_id: undefined,
			location_id: undefined,
			queue_id: undefined,
			type_id: undefined,
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
