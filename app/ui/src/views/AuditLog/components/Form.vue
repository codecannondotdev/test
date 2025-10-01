<template>
	<FormContainer
		class="form"
		:visible
		:title="props.isEdit ? 'Update AuditLog' : 'Create AuditLog'"
		:as-dialog
		@close="emit('close')">
		<form @submit.prevent="submit">
			<FormInput
				v-if="!props.hideInputs?.includes('event_type')"
				:required="true"
				:error-message="formErrors.event_type"
				label="Event Type">
				<InputText
					v-model="formData.event_type"
					:disabled="!!props.forceValues.event_type" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('performed_at')"
				:required="true"
				:error-message="formErrors.performed_at"
				label="Performed At">
				<DatePicker
					:model-value="formData.performed_at ? new Date(formData.performed_at) : undefined"
					:disabled="!!props.forceValues.performed_at"
					:show-time="true"
					selectionMode="single"
					@update:model-value="formData.performed_at = ($event as Date).toISOString()" />
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
				v-if="!props.hideInputs?.includes('affected_record_id')"
				:required="false"
				:error-message="formErrors.affected_record_id"
				label="Affected Record">
				<ModelSelect
					v-model="formData.affected_record_id"
					:api="new DocumentsApi()"
					:disabled="!!props.forceValues.affected_record_id"
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
import AuditLogsApi from '@/models/AuditLog/Api'
import type { AuditLog } from '@/models/AuditLog/Model'
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
	event_type: string
	performed_at: string
	details: string | undefined
	affected_record_id: number | undefined
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
		id?: AuditLog['id']
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
	api: () => new AuditLogsApi(),
	defaultData: () =>
		({
			event_type: '',
			performed_at: '',
			details: '',
			affected_record_id: undefined,
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
			router.push({ name: 'audit-logs-edit', params: { id: entity!.id } })
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
