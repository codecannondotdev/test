<template>
	<FormContainer
		class="form"
		:visible
		:title="props.isEdit ? 'Update Product' : 'Create Product'"
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
				v-if="!props.hideInputs?.includes('weight')"
				:required="false"
				:error-message="formErrors.weight"
				label="Weight">
				<InputNumber
					v-model="formData.weight"
					:disabled="!!props.forceValues.weight"
					:max-fraction-digits="2"
					:max="10000000000" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('price')"
				:required="true"
				:error-message="formErrors.price"
				label="Price">
				<InputNumber
					v-model="formData.price"
					:disabled="!!props.forceValues.price"
					:max-fraction-digits="2"
					:max="10000000000" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('description')"
				:required="false"
				:error-message="formErrors.description"
				label="Description">
				<Textarea
					v-model="formData.description"
					:disabled="!!props.forceValues.description"
					rows="5"
					cols="50" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('dimensions')"
				:required="false"
				:error-message="formErrors.dimensions"
				label="Dimensions">
				<InputText
					v-model="formData.dimensions"
					:disabled="!!props.forceValues.dimensions" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('category_id')"
				:required="false"
				:error-message="formErrors.category_id"
				label="Category">
				<ModelSelect
					v-model="formData.category_id"
					:api="new CategorysApi()"
					:disabled="!!props.forceValues.category_id"
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
import ProductsApi from '@/models/Product/Api'
import type { Product } from '@/models/Product/Model'
import { useForm } from '@/helpers/form'
import FormInput from '@/components/FormInput.vue'
import Button from 'primevue/button'
import FormContainer from '@/components/FormContainer.vue'
import CategorysApi from '@/models/Category/Api'
import InputNumber from 'primevue/inputnumber'
import InputText from 'primevue/inputtext'
import ModelSelect from '@/components/ModelSelect.vue'
import SuppliersApi from '@/models/Supplier/Api'
import Textarea from 'primevue/textarea'

type FormData = {
	name: string
	weight: number | undefined
	price: number
	description: string | undefined
	dimensions: string | undefined
	category_id: number | undefined
	supplier_id: number | undefined
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
		id?: Product['id']
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
	api: () => new ProductsApi(),
	defaultData: () =>
		({
			name: '',
			weight: 0,
			price: 0,
			description: '',
			dimensions: '',
			category_id: undefined,
			supplier_id: undefined,
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
			router.push({ name: 'products-edit', params: { id: entity!.id } })
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
