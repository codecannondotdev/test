<template>
	<FormContainer
		class="form"
		:visible
		:title="props.isEdit ? 'Update MedicalDeviceMaintenance' : 'Create MedicalDeviceMaintenance'"
		:as-dialog
		@close="emit('close')">
		<form @submit.prevent="submit">
			<FormInput
				v-if="!props.hideInputs?.includes('maintenance_date')"
				:required="true"
				:error-message="formErrors.maintenance_date"
				label="Maintenance Date">
				<DatePicker
					:model-value="formData.maintenance_date ? new Date(formData.maintenance_date) : undefined"
					:disabled="!!props.forceValues.maintenance_date"
					selectionMode="single"
					@update:model-value="formData.maintenance_date = ($event as Date).toISOString()" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('performed_by')"
				:required="false"
				:error-message="formErrors.performed_by"
				label="Performed By">
				<InputText
					v-model="formData.performed_by"
					:disabled="!!props.forceValues.performed_by" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('notes')"
				:required="false"
				:error-message="formErrors.notes"
				label="Notes">
				<Textarea
					v-model="formData.notes"
					:disabled="!!props.forceValues.notes"
					rows="5"
					cols="50" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('supplier_id')"
				:required="false"
				:error-message="formErrors.supplier_id"
				label="Supplier">
				<ModelSelect
					v-model="formData.supplier_id"
					:api="new SuppliersApi()"
					:disabled="!!props.forceValues.supplier_id"
					option-label="name" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('device_id')"
				:required="false"
				:error-message="formErrors.device_id"
				label="Device">
				<ModelSelect
					v-model="formData.device_id"
					:api="new DevicesApi()"
					:disabled="!!props.forceValues.device_id"
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
import MedicalDeviceMaintenancesApi from '@/models/MedicalDeviceMaintenance/Api'
import type { MedicalDeviceMaintenance } from '@/models/MedicalDeviceMaintenance/Model'
import { useForm } from '@/helpers/form'
import FormInput from '@/components/FormInput.vue'
import Button from 'primevue/button'
import FormContainer from '@/components/FormContainer.vue'
import DatePicker from 'primevue/datepicker'
import DevicesApi from '@/models/Device/Api'
import InputText from 'primevue/inputtext'
import ModelSelect from '@/components/ModelSelect.vue'
import SuppliersApi from '@/models/Supplier/Api'
import Textarea from 'primevue/textarea'

type FormData = {
	maintenance_date: string
	performed_by: string | undefined
	notes: string | undefined
	supplier_id: number | undefined
	device_id: number | undefined
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
		id?: MedicalDeviceMaintenance['id']
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
	api: () => new MedicalDeviceMaintenancesApi(),
	defaultData: () =>
		({
			maintenance_date: '',
			performed_by: '',
			notes: '',
			supplier_id: undefined,
			device_id: undefined,
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
			router.push({ name: 'medical-device-maintenances-edit', params: { id: entity!.id } })
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
