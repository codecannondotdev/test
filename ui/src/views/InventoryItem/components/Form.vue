<template>
	<FormContainer
		class="form"
		:visible
		:title="props.isEdit ? 'Update InventoryItem' : 'Create InventoryItem'"
		:as-dialog
		@close="emit('close')">
		<form @submit.prevent="submit">
			<FormInput
				v-if="!props.hideInputs?.includes('name')"
				:required="true"
				:error-message="formErrors.name"
				label="Name">
				<InputText
					v-model="formData.name"
					:disabled="!!props.forceValues.name" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('category')"
				:required="false"
				:error-message="formErrors.category"
				label="Category">
				<InputText
					v-model="formData.category"
					:disabled="!!props.forceValues.category" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('quantity')"
				:required="false"
				:error-message="formErrors.quantity"
				label="Quantity">
				<InputNumber
					v-model="formData.quantity"
					:disabled="!!props.forceValues.quantity" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('reorder_level')"
				:required="false"
				:error-message="formErrors.reorder_level"
				label="Reorder Level">
				<InputNumber
					v-model="formData.reorder_level"
					:disabled="!!props.forceValues.reorder_level" />
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
				v-if="!props.hideInputs?.includes('supplier_id')"
				:required="false"
				:error-message="formErrors.supplier_id"
				label="Supplier">
				<ModelSelect
					v-model="formData.supplier_id"
					:api="new SuppliersApi()"
					:disabled="!!props.forceValues.supplier_id"
					option-label="name" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('procurement_order_id')"
				:required="false"
				:error-message="formErrors.procurement_order_id"
				label="Procurement Order">
				<ModelSelect
					v-model="formData.procurement_order_id"
					:api="new ProcurementOrdersApi()"
					:disabled="!!props.forceValues.procurement_order_id"
					option-label="order_number" />
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
import InventoryItemsApi from '@/models/InventoryItem/Api'
import type { InventoryItem } from '@/models/InventoryItem/Model'
import { useForm } from '@/helpers/form'
import FormInput from '@/components/FormInput.vue'
import Button from 'primevue/button'
import FormContainer from '@/components/FormContainer.vue'
import InputNumber from 'primevue/inputnumber'
import InputText from 'primevue/inputtext'
import MedicationsApi from '@/models/Medication/Api'
import ModelSelect from '@/components/ModelSelect.vue'
import ProcurementOrdersApi from '@/models/ProcurementOrder/Api'
import SuppliersApi from '@/models/Supplier/Api'

type FormData = {
	name: string
	category: string | undefined
	quantity: number | undefined
	reorder_level: number | undefined
	medication_id: number | undefined
	supplier_id: number | undefined
	procurement_order_id: number | undefined
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
		id?: InventoryItem['id']
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
	api: () => new InventoryItemsApi(),
	defaultData: () =>
		({
			name: '',
			category: '',
			quantity: 0,
			reorder_level: 0,
			medication_id: undefined,
			supplier_id: undefined,
			procurement_order_id: undefined,
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
			router.push({ name: 'inventory-items-edit', params: { id: entity!.id } })
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
