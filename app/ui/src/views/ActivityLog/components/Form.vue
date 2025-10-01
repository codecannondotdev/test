<template>
	<FormContainer
		class="form"
		:visible
		:title="props.isEdit ? 'Update ActivityLog' : 'Create ActivityLog'"
		:as-dialog
		@close="emit('close')">
		<form @submit.prevent="submit">
			<FormInput
				v-if="!props.hideInputs?.includes('action')"
				:required="true"
				:error-message="formErrors.action"
				label="Action">
				<InputText
					v-model="formData.action"
					:disabled="!!props.forceValues.action" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('timestamp')"
				:required="true"
				:error-message="formErrors.timestamp"
				label="Timestamp">
				<DatePicker
					:model-value="formData.timestamp ? new Date(formData.timestamp) : undefined"
					:disabled="!!props.forceValues.timestamp"
					:show-time="true"
					selectionMode="single"
					@update:model-value="formData.timestamp = ($event as Date).toISOString()" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('details')"
				:required="false"
				:error-message="formErrors.details"
				label="Details">
				<Textarea
					v-model="formData.details"
					:disabled="!!props.forceValues.details"
					rows="5"
					cols="50" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('related_model_id')"
				:required="false"
				:error-message="formErrors.related_model_id"
				label="Related Model">
				<ModelSelect
					v-model="formData.related_model_id"
					:api="new DocumentsApi()"
					:disabled="!!props.forceValues.related_model_id"
					option-label="filename" />
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
import ActivityLogsApi from '@/models/ActivityLog/Api'
import type { ActivityLog } from '@/models/ActivityLog/Model'
import { useForm } from '@/helpers/form'
import FormInput from '@/components/FormInput.vue'
import Button from 'primevue/button'
import FormContainer from '@/components/FormContainer.vue'
import DatePicker from 'primevue/datepicker'
import DocumentsApi from '@/models/Document/Api'
import InputText from 'primevue/inputtext'
import ModelSelect from '@/components/ModelSelect.vue'
import Textarea from 'primevue/textarea'

type FormData = {
	action: string
	timestamp: string
	details: string | undefined
	related_model_id: number | undefined
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
		id?: ActivityLog['id']
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
	api: () => new ActivityLogsApi(),
	defaultData: () =>
		({
			action: '',
			timestamp: '',
			details: '',
			related_model_id: undefined,
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
			router.push({ name: 'activity-logs-edit', params: { id: entity!.id } })
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
