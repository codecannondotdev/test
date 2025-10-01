<template>
	<FormContainer
		class="form"
		:visible
		:title="props.isEdit ? 'Update BarcodeLabel' : 'Create BarcodeLabel'"
		:as-dialog
		@close="emit('close')">
		<form @submit.prevent="submit">
			<FormInput
				v-if="!props.hideInputs?.includes('code')"
				:required="true"
				:error-message="formErrors.code"
				label="Code">
				<InputText
					v-model="formData.code"
					:disabled="!!props.forceValues.code" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('type')"
				:required="false"
				:error-message="formErrors.type"
				label="Type">
				<Select
					v-model="formData.type"
					:options="[
						{ title: 'SPECIMEN', value: 'SPECIMEN' },
						{ title: 'MEDICATION', value: 'MEDICATION' },
						{ title: 'DEVICE', value: 'DEVICE' },
					]"
					:show-clear="true"
					:disabled="!!props.forceValues.type"
					option-label="title"
					option-value="value" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('printed_at')"
				:required="false"
				:error-message="formErrors.printed_at"
				label="Printed At">
				<DatePicker
					:model-value="formData.printed_at ? new Date(formData.printed_at) : undefined"
					:disabled="!!props.forceValues.printed_at"
					:show-time="true"
					selectionMode="single"
					@update:model-value="formData.printed_at = ($event as Date | null)?.toISOString()" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('medication_id')"
				:required="false"
				:error-message="formErrors.medication_id"
				label="Medication">
				<ModelSelect
					v-model="formData.medication_id"
					:api="new MedicationsApi()"
					:disabled="!!props.forceValues.medication_id"
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
import BarcodeLabelsApi from '@/models/BarcodeLabel/Api'
import type { BarcodeLabel } from '@/models/BarcodeLabel/Model'
import { useForm } from '@/helpers/form'
import FormInput from '@/components/FormInput.vue'
import Button from 'primevue/button'
import FormContainer from '@/components/FormContainer.vue'
import DatePicker from 'primevue/datepicker'
import DevicesApi from '@/models/Device/Api'
import InputText from 'primevue/inputtext'
import MedicationsApi from '@/models/Medication/Api'
import ModelSelect from '@/components/ModelSelect.vue'
import Select from 'primevue/select'
import SpecimensApi from '@/models/Specimen/Api'

type FormData = {
	code: string
	type: BarcodeLabel['type'] | undefined
	printed_at: string | undefined
	medication_id: number | undefined
	device_id: number | undefined
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
		id?: BarcodeLabel['id']
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
	api: () => new BarcodeLabelsApi(),
	defaultData: () =>
		({
			code: '',
			type: undefined,
			printed_at: '',
			medication_id: undefined,
			device_id: undefined,
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
			router.push({ name: 'barcode-labels-edit', params: { id: entity!.id } })
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
