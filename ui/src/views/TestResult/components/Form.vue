<template>
	<FormContainer
		class="form"
		:visible
		:title="props.isEdit ? 'Update TestResult' : 'Create TestResult'"
		:as-dialog
		@close="emit('close')">
		<form @submit.prevent="submit">
			<FormInput
				v-if="!props.hideInputs?.includes('result_value')"
				:required="true"
				:error-message="formErrors.result_value"
				label="Result Value">
				<Textarea
					v-model="formData.result_value"
					:disabled="!!props.forceValues.result_value"
					rows="5"
					cols="50" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('units')"
				:required="false"
				:error-message="formErrors.units"
				label="Units">
				<InputText
					v-model="formData.units"
					:disabled="!!props.forceValues.units" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('reference_range')"
				:required="false"
				:error-message="formErrors.reference_range"
				label="Reference Range">
				<Textarea
					v-model="formData.reference_range"
					:disabled="!!props.forceValues.reference_range"
					rows="5"
					cols="50" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('reported_at')"
				:required="false"
				:error-message="formErrors.reported_at"
				label="Reported At">
				<DatePicker
					:model-value="formData.reported_at ? new Date(formData.reported_at) : undefined"
					:disabled="!!props.forceValues.reported_at"
					:show-time="true"
					selectionMode="single"
					@update:model-value="formData.reported_at = ($event as Date | null)?.toISOString()" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('lab_test_id')"
				:required="false"
				:error-message="formErrors.lab_test_id"
				label="Lab Test">
				<ModelSelect
					v-model="formData.lab_test_id"
					:api="new LabTestsApi()"
					:disabled="!!props.forceValues.lab_test_id"
					option-label="test_name" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('specimen_id')"
				:required="false"
				:error-message="formErrors.specimen_id"
				label="Specimen">
				<ModelSelect
					v-model="formData.specimen_id"
					:api="new SpecimensApi()"
					:disabled="!!props.forceValues.specimen_id"
					option-label="label" />
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
import TestResultsApi from '@/models/TestResult/Api'
import type { TestResult } from '@/models/TestResult/Model'
import { useForm } from '@/helpers/form'
import FormInput from '@/components/FormInput.vue'
import Button from 'primevue/button'
import FormContainer from '@/components/FormContainer.vue'
import DatePicker from 'primevue/datepicker'
import InputText from 'primevue/inputtext'
import LabTestsApi from '@/models/LabTest/Api'
import ModelSelect from '@/components/ModelSelect.vue'
import SpecimensApi from '@/models/Specimen/Api'
import Textarea from 'primevue/textarea'

type FormData = {
	result_value: string
	units: string | undefined
	reference_range: string | undefined
	reported_at: string | undefined
	lab_test_id: number | undefined
	specimen_id: number | undefined
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
		id?: TestResult['id']
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
	api: () => new TestResultsApi(),
	defaultData: () =>
		({
			result_value: '',
			units: '',
			reference_range: '',
			reported_at: '',
			lab_test_id: undefined,
			specimen_id: undefined,
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
			router.push({ name: 'test-results-edit', params: { id: entity!.id } })
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
