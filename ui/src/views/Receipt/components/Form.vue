<template>
	<FormContainer
		class="form"
		:visible
		:title="props.isEdit ? 'Update Receipt' : 'Create Receipt'"
		:as-dialog
		@close="emit('close')">
		<form @submit.prevent="submit">
			<FormInput
				v-if="!props.hideInputs?.includes('file_name')"
				:required="true"
				:error-message="formErrors.file_name"
				label="File Name">
				<InputText
					v-model="formData.file_name"
					:disabled="!!props.forceValues.file_name" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('file_type')"
				:required="true"
				:error-message="formErrors.file_type"
				label="File Type">
				<InputText
					v-model="formData.file_type"
					:disabled="!!props.forceValues.file_type" />
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
				v-if="!props.hideInputs?.includes('file_size')"
				:required="false"
				:error-message="formErrors.file_size"
				label="File Size">
				<InputNumber
					v-model="formData.file_size"
					:disabled="!!props.forceValues.file_size" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('expense_id')"
				:required="false"
				:error-message="formErrors.expense_id"
				label="Expense">
				<ModelSelect
					v-model="formData.expense_id"
					:api="new ExpensesApi()"
					:disabled="!!props.forceValues.expense_id"
					option-label="title" />
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
import ReceiptsApi from '@/models/Receipt/Api'
import type { Receipt } from '@/models/Receipt/Model'
import { useForm } from '@/helpers/form'
import FormInput from '@/components/FormInput.vue'
import Button from 'primevue/button'
import FormContainer from '@/components/FormContainer.vue'
import DatePicker from 'primevue/datepicker'
import ExpensesApi from '@/models/Expense/Api'
import InputNumber from 'primevue/inputnumber'
import InputText from 'primevue/inputtext'
import ModelSelect from '@/components/ModelSelect.vue'
import Textarea from 'primevue/textarea'

type FormData = {
	file_name: string
	file_type: string
	uploaded_at: string
	notes: string | undefined
	file_size: number | undefined
	expense_id: number | undefined
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
		id?: Receipt['id']
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
	api: () => new ReceiptsApi(),
	defaultData: () =>
		({
			file_name: '',
			file_type: '',
			uploaded_at: '',
			notes: '',
			file_size: 0,
			expense_id: undefined,
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
			router.push({ name: 'receipts-edit', params: { id: entity!.id } })
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
