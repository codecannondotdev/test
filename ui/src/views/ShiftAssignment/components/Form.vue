<template>
	<FormContainer
		class="form"
		:visible
		:title="props.isEdit ? 'Update ShiftAssignment' : 'Create ShiftAssignment'"
		:as-dialog
		@close="emit('close')">
		<form @submit.prevent="submit">
			<FormInput
				v-if="!props.hideInputs?.includes('assignment_date')"
				:required="true"
				:error-message="formErrors.assignment_date"
				label="Assignment Date">
				<DatePicker
					:model-value="formData.assignment_date ? new Date(formData.assignment_date) : undefined"
					:disabled="!!props.forceValues.assignment_date"
					selectionMode="single"
					@update:model-value="formData.assignment_date = ($event as Date).toISOString()" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('role')"
				:required="false"
				:error-message="formErrors.role"
				label="Role">
				<InputText
					v-model="formData.role"
					:disabled="!!props.forceValues.role" />
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
				v-if="!props.hideInputs?.includes('shift_id')"
				:required="false"
				:error-message="formErrors.shift_id"
				label="Shift">
				<ModelSelect
					v-model="formData.shift_id"
					:api="new ShiftsApi()"
					:disabled="!!props.forceValues.shift_id"
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
import ShiftAssignmentsApi from '@/models/ShiftAssignment/Api'
import type { ShiftAssignment } from '@/models/ShiftAssignment/Model'
import { useForm } from '@/helpers/form'
import FormInput from '@/components/FormInput.vue'
import Button from 'primevue/button'
import FormContainer from '@/components/FormContainer.vue'
import DatePicker from 'primevue/datepicker'
import InputText from 'primevue/inputtext'
import ModelSelect from '@/components/ModelSelect.vue'
import NursesApi from '@/models/Nurse/Api'
import SchedulesApi from '@/models/Schedule/Api'
import ShiftsApi from '@/models/Shift/Api'
import Textarea from 'primevue/textarea'

type FormData = {
	assignment_date: string
	role: string | undefined
	notes: string | undefined
	nurse_id: number | undefined
	shift_id: number | undefined
	schedule_id: number | undefined
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
		id?: ShiftAssignment['id']
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
	api: () => new ShiftAssignmentsApi(),
	defaultData: () =>
		({
			assignment_date: '',
			role: '',
			notes: '',
			nurse_id: undefined,
			shift_id: undefined,
			schedule_id: undefined,
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
			router.push({ name: 'shift-assignments-edit', params: { id: entity!.id } })
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
