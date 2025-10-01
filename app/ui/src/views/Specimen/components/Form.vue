<template>
	<FormContainer
		class="form"
		:visible
		:title="props.isEdit ? 'Update Specimen' : 'Create Specimen'"
		:as-dialog
		@close="emit('close')">
		<form @submit.prevent="submit">
			<FormInput
				v-if="!props.hideInputs?.includes('label')"
				:required="true"
				:error-message="formErrors.label"
				label="Label">
				<InputText
					v-model="formData.label"
					:disabled="!!props.forceValues.label" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('collected_at')"
				:required="true"
				:error-message="formErrors.collected_at"
				label="Collected At">
				<DatePicker
					:model-value="formData.collected_at ? new Date(formData.collected_at) : undefined"
					:disabled="!!props.forceValues.collected_at"
					:show-time="true"
					selectionMode="single"
					@update:model-value="formData.collected_at = ($event as Date).toISOString()" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('storage_location')"
				:required="false"
				:error-message="formErrors.storage_location"
				label="Storage Location">
				<InputText
					v-model="formData.storage_location"
					:disabled="!!props.forceValues.storage_location" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('pathology_report_id')"
				:required="false"
				:error-message="formErrors.pathology_report_id"
				label="Pathology Report">
				<ModelSelect
					v-model="formData.pathology_report_id"
					:api="new PathologyReportsApi()"
					:disabled="!!props.forceValues.pathology_report_id"
					option-label="specimen_description" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('lab_order_id')"
				:required="false"
				:error-message="formErrors.lab_order_id"
				label="Lab Order">
				<ModelSelect
					v-model="formData.lab_order_id"
					:api="new LabOrdersApi()"
					:disabled="!!props.forceValues.lab_order_id"
					option-label="order_date" />
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
import SpecimensApi from '@/models/Specimen/Api'
import type { Specimen } from '@/models/Specimen/Model'
import { useForm } from '@/helpers/form'
import FormInput from '@/components/FormInput.vue'
import Button from 'primevue/button'
import FormContainer from '@/components/FormContainer.vue'
import DatePicker from 'primevue/datepicker'
import InputText from 'primevue/inputtext'
import LabOrdersApi from '@/models/LabOrder/Api'
import ModelSelect from '@/components/ModelSelect.vue'
import PathologyReportsApi from '@/models/PathologyReport/Api'

type FormData = {
	label: string
	collected_at: string
	storage_location: string | undefined
	pathology_report_id: number | undefined
	lab_order_id: number | undefined
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
		id?: Specimen['id']
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
	api: () => new SpecimensApi(),
	defaultData: () =>
		({
			label: '',
			collected_at: '',
			storage_location: '',
			pathology_report_id: undefined,
			lab_order_id: undefined,
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
			router.push({ name: 'specimens-edit', params: { id: entity!.id } })
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
