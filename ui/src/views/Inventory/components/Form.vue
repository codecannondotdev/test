<template>
	<FormContainer
		class="form"
		:visible
		:title="props.isEdit ? 'Update Inventory' : 'Create Inventory'"
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
				v-if="!props.hideInputs?.includes('stock_quantity')"
				:required="true"
				:error-message="formErrors.stock_quantity"
				label="Stock Quantity">
				<InputNumber
					v-model="formData.stock_quantity"
					:disabled="!!props.forceValues.stock_quantity" />
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
				v-if="!props.hideInputs?.includes('last_updated')"
				:required="false"
				:error-message="formErrors.last_updated"
				label="Last Updated">
				<DatePicker
					:model-value="formData.last_updated ? new Date(formData.last_updated) : undefined"
					:disabled="!!props.forceValues.last_updated"
					selectionMode="single"
					@update:model-value="formData.last_updated = ($event as Date | null)?.toISOString()" />
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
				v-if="!props.hideInputs?.includes('warehouse_id')"
				:required="false"
				:error-message="formErrors.warehouse_id"
				label="Warehouse">
				<ModelSelect
					v-model="formData.warehouse_id"
					:api="new WarehousesApi()"
					:disabled="!!props.forceValues.warehouse_id"
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
import InventorysApi from '@/models/Inventory/Api'
import type { Inventory } from '@/models/Inventory/Model'
import { useForm } from '@/helpers/form'
import FormInput from '@/components/FormInput.vue'
import Button from 'primevue/button'
import FormContainer from '@/components/FormContainer.vue'
import DatePicker from 'primevue/datepicker'
import InputNumber from 'primevue/inputnumber'
import InputText from 'primevue/inputtext'
import ModelSelect from '@/components/ModelSelect.vue'
import ProductsApi from '@/models/Product/Api'
import WarehousesApi from '@/models/Warehouse/Api'

type FormData = {
	item_name: string
	stock_quantity: number
	reorder_level: number | undefined
	last_updated: string | undefined
	product_id: number | undefined
	warehouse_id: number | undefined
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
		id?: Inventory['id']
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
	api: () => new InventorysApi(),
	defaultData: () =>
		({
			item_name: '',
			stock_quantity: 0,
			reorder_level: 0,
			last_updated: '',
			product_id: undefined,
			warehouse_id: undefined,
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
			router.push({ name: 'inventories-edit', params: { id: entity!.id } })
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
