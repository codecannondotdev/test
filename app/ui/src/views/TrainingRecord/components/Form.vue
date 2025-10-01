<template>
	<FormContainer
		class="form"
		:visible
		:title="props.isEdit ? 'Update TrainingRecord' : 'Create TrainingRecord'"
		:as-dialog
		@close="emit('close')">
		<form @submit.prevent="submit">
			<FormInput
				v-if="!props.hideInputs?.includes('course_name')"
				:required="true"
				:error-message="formErrors.course_name"
				label="Course Name">
				<Textarea
					v-model="formData.course_name"
					:disabled="!!props.forceValues.course_name"
					rows="5"
					cols="50" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('completion_date')"
				:required="false"
				:error-message="formErrors.completion_date"
				label="Completion Date">
				<DatePicker
					:model-value="formData.completion_date ? new Date(formData.completion_date) : undefined"
					:disabled="!!props.forceValues.completion_date"
					selectionMode="single"
					@update:model-value="formData.completion_date = ($event as Date | null)?.toISOString()" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('status')"
				:required="false"
				:error-message="formErrors.status"
				label="Status">
				<Select
					v-model="formData.status"
					:options="[
						{ title: 'COMPLETED', value: 'COMPLETED' },
						{ title: 'IN_PROGRESS', value: 'IN_PROGRESS' },
						{ title: 'OVERDUE', value: 'OVERDUE' },
					]"
					:show-clear="true"
					:disabled="!!props.forceValues.status"
					option-label="title"
					option-value="value" />
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
				v-if="!props.hideInputs?.includes('certification_id')"
				:required="false"
				:error-message="formErrors.certification_id"
				label="Certification">
				<ModelSelect
					v-model="formData.certification_id"
					:api="new CertificationsApi()"
					:disabled="!!props.forceValues.certification_id"
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
import TrainingRecordsApi from '@/models/TrainingRecord/Api'
import type { TrainingRecord } from '@/models/TrainingRecord/Model'
import { useForm } from '@/helpers/form'
import FormInput from '@/components/FormInput.vue'
import Button from 'primevue/button'
import FormContainer from '@/components/FormContainer.vue'
import CertificationsApi from '@/models/Certification/Api'
import DatePicker from 'primevue/datepicker'
import InputText from 'primevue/inputtext'
import ModelSelect from '@/components/ModelSelect.vue'
import NursesApi from '@/models/Nurse/Api'
import Select from 'primevue/select'
import Textarea from 'primevue/textarea'

type FormData = {
	course_name: string
	completion_date: string | undefined
	status: TrainingRecord['status'] | undefined
	nurse_id: number | undefined
	certification_id: number | undefined
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
		id?: TrainingRecord['id']
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
	api: () => new TrainingRecordsApi(),
	defaultData: () =>
		({
			course_name: '',
			completion_date: '',
			status: undefined,
			nurse_id: undefined,
			certification_id: undefined,
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
			router.push({ name: 'training-records-edit', params: { id: entity!.id } })
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
