<template>
	<FormContainer
		class="form"
		:visible
		:title="props.isEdit ? 'Update Surgery' : 'Create Surgery'"
		:as-dialog
		@close="emit('close')">
		<form @submit.prevent="submit">
			<FormInput
				v-if="!props.hideInputs?.includes('procedure_name')"
				:required="true"
				:error-message="formErrors.procedure_name"
				label="Procedure Name">
				<InputText
					v-model="formData.procedure_name"
					:disabled="!!props.forceValues.procedure_name" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('scheduled_start')"
				:required="true"
				:error-message="formErrors.scheduled_start"
				label="Scheduled Start">
				<DatePicker
					:model-value="formData.scheduled_start ? new Date(formData.scheduled_start) : undefined"
					:disabled="!!props.forceValues.scheduled_start"
					:show-time="true"
					selectionMode="single"
					@update:model-value="formData.scheduled_start = ($event as Date).toISOString()" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('scheduled_end')"
				:required="false"
				:error-message="formErrors.scheduled_end"
				label="Scheduled End">
				<DatePicker
					:model-value="formData.scheduled_end ? new Date(formData.scheduled_end) : undefined"
					:disabled="!!props.forceValues.scheduled_end"
					:show-time="true"
					selectionMode="single"
					@update:model-value="formData.scheduled_end = ($event as Date | null)?.toISOString()" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('status')"
				:required="false"
				:error-message="formErrors.status"
				label="Status">
				<Select
					v-model="formData.status"
					:options="[
						{ title: 'SCHEDULED', value: 'SCHEDULED' },
						{ title: 'COMPLETED', value: 'COMPLETED' },
						{ title: 'CANCELLED', value: 'CANCELLED' },
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
				v-if="!props.hideInputs?.includes('operating_room_id')"
				:required="false"
				:error-message="formErrors.operating_room_id"
				label="Operating Room">
				<ModelSelect
					v-model="formData.operating_room_id"
					:api="new OperatingRoomsApi()"
					:disabled="!!props.forceValues.operating_room_id"
					option-label="room_number" />
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
import SurgerysApi from '@/models/Surgery/Api'
import type { Surgery } from '@/models/Surgery/Model'
import { useForm } from '@/helpers/form'
import FormInput from '@/components/FormInput.vue'
import Button from 'primevue/button'
import FormContainer from '@/components/FormContainer.vue'
import DatePicker from 'primevue/datepicker'
import InputText from 'primevue/inputtext'
import ModelSelect from '@/components/ModelSelect.vue'
import OperatingRoomsApi from '@/models/OperatingRoom/Api'
import PatientsApi from '@/models/Patient/Api'
import Select from 'primevue/select'

type FormData = {
	procedure_name: string
	scheduled_start: string
	scheduled_end: string | undefined
	status: Surgery['status'] | undefined
	patient_id: number | undefined
	operating_room_id: number | undefined
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
		id?: Surgery['id']
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
	api: () => new SurgerysApi(),
	defaultData: () =>
		({
			procedure_name: '',
			scheduled_start: '',
			scheduled_end: '',
			status: undefined,
			patient_id: undefined,
			operating_room_id: undefined,
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
			router.push({ name: 'surgeries-edit', params: { id: entity!.id } })
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
