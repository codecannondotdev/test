<template>
	<FormContainer
		class="form"
		:visible
		:title="props.isEdit ? 'Update BillingItem' : 'Create BillingItem'"
		:as-dialog
		@close="emit('close')">
		<form @submit.prevent="submit">
			<FormInput
				v-if="!props.hideInputs?.includes('description')"
				:required="true"
				:error-message="formErrors.description"
				label="Description">
				<Textarea
					v-model="formData.description"
					:disabled="!!props.forceValues.description"
					rows="5"
					cols="50" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('quantity')"
				:required="true"
				:error-message="formErrors.quantity"
				label="Quantity">
				<InputNumber
					v-model="formData.quantity"
					:disabled="!!props.forceValues.quantity" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('unit_price')"
				:required="true"
				:error-message="formErrors.unit_price"
				label="Unit Price">
				<InputNumber
					v-model="formData.unit_price"
					:disabled="!!props.forceValues.unit_price"
					:max-fraction-digits="2"
					:max="10000000000" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('total_price')"
				:required="false"
				:error-message="formErrors.total_price"
				label="Total Price">
				<InputNumber
					v-model="formData.total_price"
					:disabled="!!props.forceValues.total_price"
					:max-fraction-digits="2"
					:max="10000000000" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('invoice_id')"
				:required="false"
				:error-message="formErrors.invoice_id"
				label="Invoice">
				<ModelSelect
					v-model="formData.invoice_id"
					:api="new InvoicesApi()"
					:disabled="!!props.forceValues.invoice_id"
					option-label="invoice_number" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('tax_rate_id')"
				:required="false"
				:error-message="formErrors.tax_rate_id"
				label="Tax Rate">
				<ModelSelect
					v-model="formData.tax_rate_id"
					:api="new TaxRatesApi()"
					:disabled="!!props.forceValues.tax_rate_id"
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
import BillingItemsApi from '@/models/BillingItem/Api'
import type { BillingItem } from '@/models/BillingItem/Model'
import { useForm } from '@/helpers/form'
import FormInput from '@/components/FormInput.vue'
import Button from 'primevue/button'
import FormContainer from '@/components/FormContainer.vue'
import InputNumber from 'primevue/inputnumber'
import InputText from 'primevue/inputtext'
import InvoicesApi from '@/models/Invoice/Api'
import ModelSelect from '@/components/ModelSelect.vue'
import TaxRatesApi from '@/models/TaxRate/Api'
import Textarea from 'primevue/textarea'

type FormData = {
	description: string
	quantity: number
	unit_price: number
	total_price: number | undefined
	invoice_id: number | undefined
	tax_rate_id: number | undefined
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
		id?: BillingItem['id']
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
	api: () => new BillingItemsApi(),
	defaultData: () =>
		({
			description: '',
			quantity: 0,
			unit_price: 0,
			total_price: 0,
			invoice_id: undefined,
			tax_rate_id: undefined,
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
			router.push({ name: 'billing-items-edit', params: { id: entity!.id } })
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
