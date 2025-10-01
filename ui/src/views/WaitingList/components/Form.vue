<template>
	<FormContainer
		class="form"
		:visible
		:title="props.isEdit ? 'Update WaitingList' : 'Create WaitingList'"
		:as-dialog
		@close="emit('close')">
		<form @submit.prevent="submit">
			<FormInput
				v-if="!props.hideInputs?.includes('position')"
				:required="false"
				:error-message="formErrors.position"
				label="Position">
				<InputNumber
					v-model="formData.position"
					:disabled="!!props.forceValues.position" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('added_at')"
				:required="true"
				:error-message="formErrors.added_at"
				label="Added At">
				<DatePicker
					:model-value="formData.added_at ? new Date(formData.added_at) : undefined"
					:disabled="!!props.forceValues.added_at"
					:show-time="true"
					selectionMode="single"
					@update:model-value="formData.added_at = ($event as Date).toISOString()" />
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
				v-if="!props.hideInputs?.includes('appointment_id')"
				:required="false"
				:error-message="formErrors.appointment_id"
				label="Appointment">
				<ModelSelect
					v-model="formData.appointment_id"
					:api="new AppointmentsApi()"
					:disabled="!!props.forceValues.appointment_id"
					option-label="start_time" />
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
import WaitingListsApi from '@/models/WaitingList/Api'
import type { WaitingList } from '@/models/WaitingList/Model'
import { useForm } from '@/helpers/form'
import FormInput from '@/components/FormInput.vue'
import Button from 'primevue/button'
import FormContainer from '@/components/FormContainer.vue'
import AppointmentsApi from '@/models/Appointment/Api'
import DatePicker from 'primevue/datepicker'
import InputNumber from 'primevue/inputnumber'
import InputText from 'primevue/inputtext'
import ModelSelect from '@/components/ModelSelect.vue'
import PatientsApi from '@/models/Patient/Api'
import QueuesApi from '@/models/Queue/Api'
import Textarea from 'primevue/textarea'

type FormData = {
	position: number | undefined
	added_at: string
	notes: string | undefined
	patient_id: number | undefined
	appointment_id: number | undefined
	queue_id: number | undefined
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
		id?: WaitingList['id']
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
	api: () => new WaitingListsApi(),
	defaultData: () =>
		({
			position: 0,
			added_at: '',
			notes: '',
			patient_id: undefined,
			appointment_id: undefined,
			queue_id: undefined,
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
			router.push({ name: 'waiting-lists-edit', params: { id: entity!.id } })
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
