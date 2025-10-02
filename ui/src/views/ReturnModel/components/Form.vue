<template>
	<FormContainer
		class="form"
		:visible
		:title="props.isEdit ? 'Update ReturnModel' : 'Create ReturnModel'"
		:as-dialog
		@close="emit('close')">
		<form @submit.prevent="submit">
			<FormInput
				v-if="!props.hideInputs?.includes('return_date')"
				:required="true"
				:error-message="formErrors.return_date"
				label="Return Date">
				<DatePicker
					:model-value="formData.return_date ? new Date(formData.return_date) : undefined"
					:disabled="!!props.forceValues.return_date"
					selectionMode="single"
					@update:model-value="formData.return_date = ($event as Date).toISOString()" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('reason')"
				:required="true"
				:error-message="formErrors.reason"
				label="Reason">
				<Textarea
					v-model="formData.reason"
					:disabled="!!props.forceValues.reason"
					rows="5"
					cols="50" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('condition')"
				:required="false"
				:error-message="formErrors.condition"
				label="Condition">
				<Textarea
					v-model="formData.condition"
					:disabled="!!props.forceValues.condition"
					rows="5"
					cols="50" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('customer_id')"
				:required="false"
				:error-message="formErrors.customer_id"
				label="Customer">
				<ModelSelect
					v-model="formData.customer_id"
					:api="new CustomersApi()"
					:disabled="!!props.forceValues.customer_id"
					option-label="first_name" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('order_id')"
				:required="false"
				:error-message="formErrors.order_id"
				label="Order">
				<ModelSelect
					v-model="formData.order_id"
					:api="new OrdersApi()"
					:disabled="!!props.forceValues.order_id"
					option-label="status" />
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
import ReturnModelsApi from '@/models/ReturnModel/Api'
import type { ReturnModel } from '@/models/ReturnModel/Model'
import { useForm } from '@/helpers/form'
import FormInput from '@/components/FormInput.vue'
import Button from 'primevue/button'
import FormContainer from '@/components/FormContainer.vue'
import CustomersApi from '@/models/Customer/Api'
import DatePicker from 'primevue/datepicker'
import InputText from 'primevue/inputtext'
import ModelSelect from '@/components/ModelSelect.vue'
import OrdersApi from '@/models/Order/Api'
import Textarea from 'primevue/textarea'

type FormData = {
	return_date: string
	reason: string
	condition: string | undefined
	customer_id: number | undefined
	order_id: number | undefined
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
		id?: ReturnModel['id']
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
	api: () => new ReturnModelsApi(),
	defaultData: () =>
		({
			return_date: '',
			reason: '',
			condition: '',
			customer_id: undefined,
			order_id: undefined,
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
			router.push({ name: 'returns-edit', params: { id: entity!.id } })
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
