<template>
	<FormContainer
		class="form"
		:visible
		:title="props.isEdit ? 'Update RadiologyReport' : 'Create RadiologyReport'"
		:as-dialog
		@close="emit('close')">
		<form @submit.prevent="submit">
			<FormInput
				v-if="!props.hideInputs?.includes('study_type')"
				:required="true"
				:error-message="formErrors.study_type"
				label="Study Type">
				<InputText
					v-model="formData.study_type"
					:disabled="!!props.forceValues.study_type" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('findings')"
				:required="false"
				:error-message="formErrors.findings"
				label="Findings">
				<Textarea
					v-model="formData.findings"
					:disabled="!!props.forceValues.findings"
					rows="5"
					cols="50" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('impression')"
				:required="false"
				:error-message="formErrors.impression"
				label="Impression">
				<Textarea
					v-model="formData.impression"
					:disabled="!!props.forceValues.impression"
					rows="5"
					cols="50" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('report_date')"
				:required="true"
				:error-message="formErrors.report_date"
				label="Report Date">
				<DatePicker
					:model-value="formData.report_date ? new Date(formData.report_date) : undefined"
					:disabled="!!props.forceValues.report_date"
					selectionMode="single"
					@update:model-value="formData.report_date = ($event as Date).toISOString()" />
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
import RadiologyReportsApi from '@/models/RadiologyReport/Api'
import type { RadiologyReport } from '@/models/RadiologyReport/Model'
import { useForm } from '@/helpers/form'
import FormInput from '@/components/FormInput.vue'
import Button from 'primevue/button'
import FormContainer from '@/components/FormContainer.vue'
import DatePicker from 'primevue/datepicker'
import ImagingStudysApi from '@/models/ImagingStudy/Api'
import InputText from 'primevue/inputtext'
import ModelSelect from '@/components/ModelSelect.vue'
import PatientsApi from '@/models/Patient/Api'
import Textarea from 'primevue/textarea'

type FormData = {
	study_type: string
	findings: string | undefined
	impression: string | undefined
	report_date: string
	patient_id: number | undefined
	imaging_study_id: number | undefined
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
		id?: RadiologyReport['id']
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
	api: () => new RadiologyReportsApi(),
	defaultData: () =>
		({
			study_type: '',
			findings: '',
			impression: '',
			report_date: '',
			patient_id: undefined,
			imaging_study_id: undefined,
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
			router.push({ name: 'radiology-reports-edit', params: { id: entity!.id } })
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
