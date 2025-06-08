<template>
	<FormContainer
		class="form"
		:visible
		:title="props.isEdit ? 'Update Inventory' : 'Create Inventory'"
		:as-dialog
		@close="emit('close')">
		<form @submit.prevent="submit">
			<FormInput
				v-if="!props.hideInputs?.includes('inventory_type')"
				:required="true"
				:error-message="formErrors.inventory_type"
				label="Inventory Type">
				<Select
					v-model="formData.inventory_type"
					:options="[
						{ title: 'RAW MATERIAL', value: 'RAW MATERIAL' },
						{ title: 'FINISHED PRODUCT', value: 'FINISHED PRODUCT' },
					]"
					:show-clear="false"
					:disabled="!!props.forceValues.inventory_type"
					option-label="title"
					option-value="value" />
			</FormInput>
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
				v-if="!props.hideInputs?.includes('quantity_on_hand')"
				:required="true"
				:error-message="formErrors.quantity_on_hand"
				label="Quantity On Hand">
				<InputNumber
					v-model="formData.quantity_on_hand"
					:disabled="!!props.forceValues.quantity_on_hand" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('location')"
				:required="true"
				:error-message="formErrors.location"
				label="Location">
				<InputText
					v-model="formData.location"
					:disabled="!!props.forceValues.location" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('last_updated')"
				:required="true"
				:error-message="formErrors.last_updated"
				label="Last Updated">
				<DatePicker
					:model-value="formData.last_updated ? new Date(formData.last_updated) : undefined"
					:disabled="!!props.forceValues.last_updated"
					selectionMode="single"
					@update:model-value="formData.last_updated = ($event as Date).toISOString()" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('material_id')"
				:required="false"
				:error-message="formErrors.material_id"
				label="Material">
				<ModelSelect
					v-model="formData.material_id"
					:api="new MaterialsApi()"
					:disabled="!!props.forceValues.material_id"
					option-label="name" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('car_model_id')"
				:required="false"
				:error-message="formErrors.car_model_id"
				label="Car Model">
				<ModelSelect
					v-model="formData.car_model_id"
					:api="new CarModelsApi()"
					:disabled="!!props.forceValues.car_model_id"
					option-label="model_name" />
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
import CarModelsApi from '@/models/CarModel/Api'
import DatePicker from 'primevue/datepicker'
import InputNumber from 'primevue/inputnumber'
import InputText from 'primevue/inputtext'
import MaterialsApi from '@/models/Material/Api'
import ModelSelect from '@/components/ModelSelect.vue'
import Select from 'primevue/select'

type FormData = {
	inventory_type: Inventory['inventory_type']
	item_name: string
	quantity_on_hand: number
	location: string
	last_updated: string
	material_id: number | undefined
	car_model_id: number | undefined
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
			inventory_type: 'RAW MATERIAL',
			item_name: '',
			quantity_on_hand: 0,
			location: '',
			last_updated: '',
			material_id: undefined,
			car_model_id: undefined,
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
