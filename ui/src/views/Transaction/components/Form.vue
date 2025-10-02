<template>
	<FormContainer
		class="form"
		:visible
		:title="props.isEdit ? 'Update Transaction' : 'Create Transaction'"
		:as-dialog
		@close="emit('close')">
		<form @submit.prevent="submit">
			<FormInput
				v-if="!props.hideInputs?.includes('transaction_date')"
				:required="true"
				:error-message="formErrors.transaction_date"
				label="Transaction Date">
				<DatePicker
					:model-value="formData.transaction_date ? new Date(formData.transaction_date) : undefined"
					:disabled="!!props.forceValues.transaction_date"
					selectionMode="single"
					@update:model-value="formData.transaction_date = ($event as Date).toISOString()" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('amount')"
				:required="true"
				:error-message="formErrors.amount"
				label="Amount">
				<InputNumber
					v-model="formData.amount"
					:disabled="!!props.forceValues.amount"
					:max-fraction-digits="2"
					:max="10000000000" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('type')"
				:required="true"
				:error-message="formErrors.type"
				label="Type">
				<InputText
					v-model="formData.type"
					:disabled="!!props.forceValues.type" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('employee_id')"
				:required="false"
				:error-message="formErrors.employee_id"
				label="Employee">
				<ModelSelect
					v-model="formData.employee_id"
					:api="new EmployeesApi()"
					:disabled="!!props.forceValues.employee_id"
					option-label="first_name" />
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
import TransactionsApi from '@/models/Transaction/Api'
import type { Transaction } from '@/models/Transaction/Model'
import { useForm } from '@/helpers/form'
import FormInput from '@/components/FormInput.vue'
import Button from 'primevue/button'
import FormContainer from '@/components/FormContainer.vue'
import DatePicker from 'primevue/datepicker'
import EmployeesApi from '@/models/Employee/Api'
import InputNumber from 'primevue/inputnumber'
import InputText from 'primevue/inputtext'
import ModelSelect from '@/components/ModelSelect.vue'

type FormData = {
	transaction_date: string
	amount: number
	type: string
	employee_id: number | undefined
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
		id?: Transaction['id']
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
	api: () => new TransactionsApi(),
	defaultData: () =>
		({
			transaction_date: '',
			amount: 0,
			type: '',
			employee_id: undefined,
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
			router.push({ name: 'transactions-edit', params: { id: entity!.id } })
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
