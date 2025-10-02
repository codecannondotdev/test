<template>
	<FormContainer
		class="form"
		:visible
		:title="props.isEdit ? 'Update OrderItem' : 'Create OrderItem'"
		:as-dialog
		@close="emit('close')">
		<form @submit.prevent="submit">
			<FormInput
				v-if="!props.hideInputs?.includes('item_name')"
				:required="true"
				:error-message="formErrors.item_name"
				label="Item Name">
				<InputText
					v-model="formData.item_name"
					:disabled="!!props.forceValues.item_name" />
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
				v-if="!props.hideInputs?.includes('product_id')"
				:required="false"
				:error-message="formErrors.product_id"
				label="Product">
				<ModelSelect
					v-model="formData.product_id"
					:api="new ProductsApi()"
					:disabled="!!props.forceValues.product_id"
					option-label="name" />
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
import OrderItemsApi from '@/models/OrderItem/Api'
import type { OrderItem } from '@/models/OrderItem/Model'
import { useForm } from '@/helpers/form'
import FormInput from '@/components/FormInput.vue'
import Button from 'primevue/button'
import FormContainer from '@/components/FormContainer.vue'
import InputNumber from 'primevue/inputnumber'
import InputText from 'primevue/inputtext'
import ModelSelect from '@/components/ModelSelect.vue'
import OrdersApi from '@/models/Order/Api'
import ProductsApi from '@/models/Product/Api'

type FormData = {
	item_name: string
	quantity: number
	unit_price: number
	product_id: number | undefined
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
		id?: OrderItem['id']
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
	api: () => new OrderItemsApi(),
	defaultData: () =>
		({
			item_name: '',
			quantity: 0,
			unit_price: 0,
			product_id: undefined,
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
			router.push({ name: 'order-items-edit', params: { id: entity!.id } })
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
