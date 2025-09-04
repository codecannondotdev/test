<template>
	<FormContainer
		class="form"
		:visible
		:title="props.isEdit ? 'Update Payment' : 'Create Payment'"
		:as-dialog
		@close="emit('close')">
		<form @submit.prevent="submit">
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
				v-if="!props.hideInputs?.includes('payment_date')"
				:required="true"
				:error-message="formErrors.payment_date"
				label="Payment Date">
				<DatePicker
					:model-value="formData.payment_date ? new Date(formData.payment_date) : undefined"
					:disabled="!!props.forceValues.payment_date"
					selectionMode="single"
					@update:model-value="formData.payment_date = ($event as Date).toISOString()" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('payment_method')"
				:required="true"
				:error-message="formErrors.payment_method"
				label="Payment Method">
				<Select
					v-model="formData.payment_method"
					:options="[
						{ title: 'CASH', value: 'CASH' },
						{ title: 'CREDIT CARD', value: 'CREDIT CARD' },
						{ title: 'DEBIT CARD', value: 'DEBIT CARD' },
					]"
					:show-clear="false"
					:disabled="!!props.forceValues.payment_method"
					option-label="title"
					option-value="value" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('member_id')"
				:required="false"
				:error-message="formErrors.member_id"
				label="Member">
				<ModelSelect
					v-model="formData.member_id"
					:api="new MembersApi()"
					:disabled="!!props.forceValues.member_id"
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
import PaymentsApi from '@/models/Payment/Api'
import type { Payment } from '@/models/Payment/Model'
import { useForm } from '@/helpers/form'
import FormInput from '@/components/FormInput.vue'
import Button from 'primevue/button'
import FormContainer from '@/components/FormContainer.vue'
import DatePicker from 'primevue/datepicker'
import InputNumber from 'primevue/inputnumber'
import InputText from 'primevue/inputtext'
import MembersApi from '@/models/Member/Api'
import ModelSelect from '@/components/ModelSelect.vue'
import Select from 'primevue/select'

type FormData = {
	amount: number
	payment_date: string
	payment_method: Payment['payment_method']
	member_id: number | undefined
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
		id?: Payment['id']
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
	api: () => new PaymentsApi(),
	defaultData: () =>
		({
			amount: 0,
			payment_date: '',
			payment_method: 'CASH',
			member_id: undefined,
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
			router.push({ name: 'payments-edit', params: { id: entity!.id } })
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
