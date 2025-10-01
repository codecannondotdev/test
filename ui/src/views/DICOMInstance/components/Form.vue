<template>
	<FormContainer
		class="form"
		:visible
		:title="props.isEdit ? 'Update DICOMInstance' : 'Create DICOMInstance'"
		:as-dialog
		@close="emit('close')">
		<form @submit.prevent="submit">
			<FormInput
				v-if="!props.hideInputs?.includes('uid')"
				:required="true"
				:error-message="formErrors.uid"
				label="Uid">
				<InputText
					v-model="formData.uid"
					:disabled="!!props.forceValues.uid" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('sop_class')"
				:required="false"
				:error-message="formErrors.sop_class"
				label="Sop Class">
				<InputText
					v-model="formData.sop_class"
					:disabled="!!props.forceValues.sop_class" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('stored_at')"
				:required="false"
				:error-message="formErrors.stored_at"
				label="Stored At">
				<DatePicker
					:model-value="formData.stored_at ? new Date(formData.stored_at) : undefined"
					:disabled="!!props.forceValues.stored_at"
					:show-time="true"
					selectionMode="single"
					@update:model-value="formData.stored_at = ($event as Date | null)?.toISOString()" />
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
				v-if="!props.hideInputs?.includes('integration_id')"
				:required="false"
				:error-message="formErrors.integration_id"
				label="Integration">
				<ModelSelect
					v-model="formData.integration_id"
					:api="new IntegrationsApi()"
					:disabled="!!props.forceValues.integration_id"
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
import DICOMInstancesApi from '@/models/DICOMInstance/Api'
import type { DICOMInstance } from '@/models/DICOMInstance/Model'
import { useForm } from '@/helpers/form'
import FormInput from '@/components/FormInput.vue'
import Button from 'primevue/button'
import FormContainer from '@/components/FormContainer.vue'
import DatePicker from 'primevue/datepicker'
import ImagingStudysApi from '@/models/ImagingStudy/Api'
import InputText from 'primevue/inputtext'
import IntegrationsApi from '@/models/Integration/Api'
import ModelSelect from '@/components/ModelSelect.vue'

type FormData = {
	uid: string
	sop_class: string | undefined
	stored_at: string | undefined
	imaging_study_id: number | undefined
	integration_id: number | undefined
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
		id?: DICOMInstance['id']
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
	api: () => new DICOMInstancesApi(),
	defaultData: () =>
		({
			uid: '',
			sop_class: '',
			stored_at: '',
			imaging_study_id: undefined,
			integration_id: undefined,
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
			router.push({ name: 'dicom-instances-edit', params: { id: entity!.id } })
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
