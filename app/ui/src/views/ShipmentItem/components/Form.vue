<template>
	<FormContainer
		class="form"
		:visible
		:title="props.isEdit ? 'Update ShipmentItem' : 'Create ShipmentItem'"
		:as-dialog
		@close="emit('close')">
		<form @submit.prevent="submit">
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
				v-if="!props.hideInputs?.includes('shipment_id')"
				:required="false"
				:error-message="formErrors.shipment_id"
				label="Shipment">
				<ModelSelect
					v-model="formData.shipment_id"
					:api="new ShipmentsApi()"
					:disabled="!!props.forceValues.shipment_id"
					option-label="carrier" />
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
import ShipmentItemsApi from '@/models/ShipmentItem/Api'
import type { ShipmentItem } from '@/models/ShipmentItem/Model'
import { useForm } from '@/helpers/form'
import FormInput from '@/components/FormInput.vue'
import Button from 'primevue/button'
import FormContainer from '@/components/FormContainer.vue'
import InputNumber from 'primevue/inputnumber'
import InputText from 'primevue/inputtext'
import ModelSelect from '@/components/ModelSelect.vue'
import ProductsApi from '@/models/Product/Api'
import ShipmentsApi from '@/models/Shipment/Api'
import Textarea from 'primevue/textarea'

type FormData = {
	quantity: number
	condition: string | undefined
	product_id: number | undefined
	shipment_id: number | undefined
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
		id?: ShipmentItem['id']
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
	api: () => new ShipmentItemsApi(),
	defaultData: () =>
		({
			quantity: 0,
			condition: '',
			product_id: undefined,
			shipment_id: undefined,
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
			router.push({ name: 'shipment-items-edit', params: { id: entity!.id } })
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
