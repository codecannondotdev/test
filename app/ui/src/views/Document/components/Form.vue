<template>
	<FormContainer
		class="form"
		:visible
		:title="props.isEdit ? 'Update Document' : 'Create Document'"
		:as-dialog
		@close="emit('close')">
		<form @submit.prevent="submit">
			<FormInput
				v-if="!props.hideInputs?.includes('filename')"
				:required="true"
				:error-message="formErrors.filename"
				label="Filename">
				<InputText
					v-model="formData.filename"
					:disabled="!!props.forceValues.filename" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('content_type')"
				:required="false"
				:error-message="formErrors.content_type"
				label="Content Type">
				<InputText
					v-model="formData.content_type"
					:disabled="!!props.forceValues.content_type" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('uploaded_at')"
				:required="true"
				:error-message="formErrors.uploaded_at"
				label="Uploaded At">
				<DatePicker
					:model-value="formData.uploaded_at ? new Date(formData.uploaded_at) : undefined"
					:disabled="!!props.forceValues.uploaded_at"
					:show-time="true"
					selectionMode="single"
					@update:model-value="formData.uploaded_at = ($event as Date).toISOString()" />
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
				v-if="!props.hideInputs?.includes('medical_record_id')"
				:required="false"
				:error-message="formErrors.medical_record_id"
				label="Medical Record">
				<ModelSelect
					v-model="formData.medical_record_id"
					:api="new MedicalRecordsApi()"
					:disabled="!!props.forceValues.medical_record_id"
					option-label="title" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('imaging_study_id')"
				:required="false"
				:error-message="formErrors.imaging_study_id"
				label="Imaging Study">
				<ModelSelect
					v-model="formData.imaging_study_id"
					:api="new ImagingStudysApi()"
					:disabled="!!props.forceValues.imaging_study_id"
					option-label="study_type" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('legal_hold_id')"
				:required="false"
				:error-message="formErrors.legal_hold_id"
				label="Legal Hold">
				<ModelSelect
					v-model="formData.legal_hold_id"
					:api="new LegalHoldsApi()"
					:disabled="!!props.forceValues.legal_hold_id"
					option-label="reason" />
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
import DocumentsApi from '@/models/Document/Api'
import type { Document } from '@/models/Document/Model'
import { useForm } from '@/helpers/form'
import FormInput from '@/components/FormInput.vue'
import Button from 'primevue/button'
import FormContainer from '@/components/FormContainer.vue'
import DatePicker from 'primevue/datepicker'
import ImagingStudysApi from '@/models/ImagingStudy/Api'
import InputText from 'primevue/inputtext'
import LegalHoldsApi from '@/models/LegalHold/Api'
import MedicalRecordsApi from '@/models/MedicalRecord/Api'
import ModelSelect from '@/components/ModelSelect.vue'
import Textarea from 'primevue/textarea'

type FormData = {
	filename: string
	content_type: string | undefined
	uploaded_at: string
	description: string | undefined
	medical_record_id: number | undefined
	imaging_study_id: number | undefined
	legal_hold_id: number | undefined
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
		id?: Document['id']
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
	api: () => new DocumentsApi(),
	defaultData: () =>
		({
			filename: '',
			content_type: '',
			uploaded_at: '',
			description: '',
			medical_record_id: undefined,
			imaging_study_id: undefined,
			legal_hold_id: undefined,
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
			router.push({ name: 'documents-edit', params: { id: entity!.id } })
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
