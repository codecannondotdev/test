<template>
	<FormContainer
		class="form"
		:visible
		:title="props.isEdit ? 'Update LabTest' : 'Create LabTest'"
		:as-dialog
		@close="emit('close')">
		<form @submit.prevent="submit">
			<FormInput
				v-if="!props.hideInputs?.includes('test_name')"
				:required="true"
				:error-message="formErrors.test_name"
				label="Test Name">
				<InputText
					v-model="formData.test_name"
					:disabled="!!props.forceValues.test_name" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('specimen_type')"
				:required="false"
				:error-message="formErrors.specimen_type"
				label="Specimen Type">
				<InputText
					v-model="formData.specimen_type"
					:disabled="!!props.forceValues.specimen_type" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('order_date')"
				:required="true"
				:error-message="formErrors.order_date"
				label="Order Date">
				<DatePicker
					:model-value="formData.order_date ? new Date(formData.order_date) : undefined"
					:disabled="!!props.forceValues.order_date"
					selectionMode="single"
					@update:model-value="formData.order_date = ($event as Date).toISOString()" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('status')"
				:required="false"
				:error-message="formErrors.status"
				label="Status">
				<Select
					v-model="formData.status"
					:options="[
						{ title: 'Ordered', value: 'Ordered' },
						{ title: 'Collected', value: 'Collected' },
						{ title: 'Processing', value: 'Processing' },
						{ title: 'Completed', value: 'Completed' },
					]"
					:show-clear="true"
					:disabled="!!props.forceValues.status"
					option-label="title"
					option-value="value" />
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
				v-if="!props.hideInputs?.includes('ordering_doctor_id')"
				:required="false"
				:error-message="formErrors.ordering_doctor_id"
				label="Ordering Doctor">
				<ModelSelect
					v-model="formData.ordering_doctor_id"
					:api="new DoctorsApi()"
					:disabled="!!props.forceValues.ordering_doctor_id"
					option-label="first_name" />
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
import LabTestsApi from '@/models/LabTest/Api'
import type { LabTest } from '@/models/LabTest/Model'
import { useForm } from '@/helpers/form'
import FormInput from '@/components/FormInput.vue'
import Button from 'primevue/button'
import FormContainer from '@/components/FormContainer.vue'
import DatePicker from 'primevue/datepicker'
import DoctorsApi from '@/models/Doctor/Api'
import InputText from 'primevue/inputtext'
import LabOrdersApi from '@/models/LabOrder/Api'
import ModelSelect from '@/components/ModelSelect.vue'
import PatientsApi from '@/models/Patient/Api'
import Select from 'primevue/select'

type FormData = {
	test_name: string
	specimen_type: string | undefined
	order_date: string
	status: LabTest['status'] | undefined
	patient_id: number | undefined
	ordering_doctor_id: number | undefined
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
		id?: LabTest['id']
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
	api: () => new LabTestsApi(),
	defaultData: () =>
		({
			test_name: '',
			specimen_type: '',
			order_date: '',
			status: undefined,
			patient_id: undefined,
			ordering_doctor_id: undefined,
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
			router.push({ name: 'lab-tests-edit', params: { id: entity!.id } })
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
