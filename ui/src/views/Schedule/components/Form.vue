<template>
	<FormContainer
		class="form"
		:visible
		:title="props.isEdit ? 'Update Schedule' : 'Create Schedule'"
		:as-dialog
		@close="emit('close')">
		<form @submit.prevent="submit">
			<FormInput
				v-if="!props.hideInputs?.includes('day')"
				:required="true"
				:error-message="formErrors.day"
				label="Day">
				<InputText
					v-model="formData.day"
					:disabled="!!props.forceValues.day" />
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
				v-if="!props.hideInputs?.includes('class_id')"
				:required="false"
				:error-message="formErrors.class_id"
				label="Class">
				<ModelSelect
					v-model="formData.class_id"
					:api="new ClassModelsApi()"
					:disabled="!!props.forceValues.class_id"
					option-label="title" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('studio_id')"
				:required="false"
				:error-message="formErrors.studio_id"
				label="Studio">
				<ModelSelect
					v-model="formData.studio_id"
					:api="new StudiosApi()"
					:disabled="!!props.forceValues.studio_id"
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
import SchedulesApi from '@/models/Schedule/Api'
import type { Schedule } from '@/models/Schedule/Model'
import { useForm } from '@/helpers/form'
import FormInput from '@/components/FormInput.vue'
import Button from 'primevue/button'
import FormContainer from '@/components/FormContainer.vue'
import ClassModelsApi from '@/models/ClassModel/Api'
import DatePicker from 'primevue/datepicker'
import InputText from 'primevue/inputtext'
import ModelSelect from '@/components/ModelSelect.vue'
import StudiosApi from '@/models/Studio/Api'

type FormData = {
	day: string
	start_time: string
	end_time: string
	class_id: number | undefined
	studio_id: number | undefined
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
		id?: Schedule['id']
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
	api: () => new SchedulesApi(),
	defaultData: () =>
		({
			day: '',
			start_time: '',
			end_time: '',
			class_id: undefined,
			studio_id: undefined,
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
			router.push({ name: 'schedules-edit', params: { id: entity!.id } })
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
