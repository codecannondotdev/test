<template>
	<FormContainer
		class="form"
		:visible
		:title="props.isEdit ? 'Update ExpenseReport' : 'Create ExpenseReport'"
		:as-dialog
		@close="emit('close')">
		<form @submit.prevent="submit">
			<FormInput
				v-if="!props.hideInputs?.includes('title')"
				:required="true"
				:error-message="formErrors.title"
				label="Title">
				<InputText
					v-model="formData.title"
					:disabled="!!props.forceValues.title" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('total_amount')"
				:required="true"
				:error-message="formErrors.total_amount"
				label="Total Amount">
				<InputNumber
					v-model="formData.total_amount"
					:disabled="!!props.forceValues.total_amount"
					:max-fraction-digits="2"
					:max="10000000000" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('currency')"
				:required="true"
				:error-message="formErrors.currency"
				label="Currency">
				<Select
					v-model="formData.currency"
					:options="[
						{ title: 'USD', value: 'USD' },
						{ title: 'EUR', value: 'EUR' },
						{ title: 'GBP', value: 'GBP' },
						{ title: 'JPY', value: 'JPY' },
						{ title: 'AUD', value: 'AUD' },
						{ title: 'CAD', value: 'CAD' },
					]"
					:show-clear="false"
					:disabled="!!props.forceValues.currency"
					option-label="title"
					option-value="value" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('submitted_at')"
				:required="false"
				:error-message="formErrors.submitted_at"
				label="Submitted At">
				<DatePicker
					:model-value="formData.submitted_at ? new Date(formData.submitted_at) : undefined"
					:disabled="!!props.forceValues.submitted_at"
					:show-time="true"
					selectionMode="single"
					@update:model-value="formData.submitted_at = ($event as Date | null)?.toISOString()" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('status')"
				:required="true"
				:error-message="formErrors.status"
				label="Status">
				<Select
					v-model="formData.status"
					:options="[
						{ title: 'DRAFT', value: 'DRAFT' },
						{ title: 'SUBMITTED', value: 'SUBMITTED' },
						{ title: 'APPROVED', value: 'APPROVED' },
						{ title: 'REIMBURSED', value: 'REIMBURSED' },
						{ title: 'DECLINED', value: 'DECLINED' },
					]"
					:show-clear="false"
					:disabled="!!props.forceValues.status"
					option-label="title"
					option-value="value" />
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
import ExpenseReportsApi from '@/models/ExpenseReport/Api'
import type { ExpenseReport } from '@/models/ExpenseReport/Model'
import { useForm } from '@/helpers/form'
import FormInput from '@/components/FormInput.vue'
import Button from 'primevue/button'
import FormContainer from '@/components/FormContainer.vue'
import DatePicker from 'primevue/datepicker'
import InputNumber from 'primevue/inputnumber'
import InputText from 'primevue/inputtext'
import Select from 'primevue/select'
import Textarea from 'primevue/textarea'

type FormData = {
	title: string
	total_amount: number
	currency: ExpenseReport['currency']
	submitted_at: string | undefined
	status: ExpenseReport['status']
	notes: string | undefined
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
		id?: ExpenseReport['id']
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
	api: () => new ExpenseReportsApi(),
	defaultData: () =>
		({
			title: '',
			total_amount: 0,
			currency: 'USD',
			submitted_at: '',
			status: 'DRAFT',
			notes: '',
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
			router.push({ name: 'expense-reports-edit', params: { id: entity!.id } })
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
