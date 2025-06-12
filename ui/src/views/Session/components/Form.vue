<template>
	<FormContainer
		class="form"
		:visible
		:title="props.isEdit ? 'Update Session' : 'Create Session'"
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
				v-if="!props.hideInputs?.includes('start_time')"
				:required="true"
				:error-message="formErrors.start_time"
				label="Start Time">
				<DatePicker
					:model-value="formData.start_time ? new Date(formData.start_time) : undefined"
					:disabled="!!props.forceValues.start_time"
					:time-only="true"
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
					:time-only="true"
					selectionMode="single"
					@update:model-value="formData.end_time = ($event as Date).toISOString()" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('capacity')"
				:required="true"
				:error-message="formErrors.capacity"
				label="Capacity">
				<InputNumber
					v-model="formData.capacity"
					:disabled="!!props.forceValues.capacity" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('trainer_id')"
				:required="false"
				:error-message="formErrors.trainer_id"
				label="Trainer">
				<ModelSelect
					v-model="formData.trainer_id"
					:api="new TrainersApi()"
					:disabled="!!props.forceValues.trainer_id"
					option-label="first_name" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('fitness_class_id')"
				:required="false"
				:error-message="formErrors.fitness_class_id"
				label="Fitness Class">
				<ModelSelect
					v-model="formData.fitness_class_id"
					:api="new ClassModelsApi()"
					:disabled="!!props.forceValues.fitness_class_id"
					option-label="name" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('schedule_id')"
				:required="false"
				:error-message="formErrors.schedule_id"
				label="Schedule">
				<ModelSelect
					v-model="formData.schedule_id"
					:api="new SchedulesApi()"
					:disabled="!!props.forceValues.schedule_id"
					option-label="title" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('facility_id')"
				:required="false"
				:error-message="formErrors.facility_id"
				label="Facility">
				<ModelSelect
					v-model="formData.facility_id"
					:api="new FacilitysApi()"
					:disabled="!!props.forceValues.facility_id"
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
import SessionsApi from '@/models/Session/Api'
import type { Session } from '@/models/Session/Model'
import { useForm } from '@/helpers/form'
import FormInput from '@/components/FormInput.vue'
import Button from 'primevue/button'
import FormContainer from '@/components/FormContainer.vue'
import ClassModelsApi from '@/models/ClassModel/Api'
import DatePicker from 'primevue/datepicker'
import FacilitysApi from '@/models/Facility/Api'
import InputNumber from 'primevue/inputnumber'
import InputText from 'primevue/inputtext'
import ModelSelect from '@/components/ModelSelect.vue'
import SchedulesApi from '@/models/Schedule/Api'
import TrainersApi from '@/models/Trainer/Api'

type FormData = {
	date: string
	start_time: string
	end_time: string
	capacity: number
	trainer_id: number | undefined
	fitness_class_id: number | undefined
	schedule_id: number | undefined
	facility_id: number | undefined
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
		id?: Session['id']
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
	api: () => new SessionsApi(),
	defaultData: () =>
		({
			date: '',
			start_time: '',
			end_time: '',
			capacity: 0,
			trainer_id: undefined,
			fitness_class_id: undefined,
			schedule_id: undefined,
			facility_id: undefined,
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
			router.push({ name: 'sessions-edit', params: { id: entity!.id } })
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
