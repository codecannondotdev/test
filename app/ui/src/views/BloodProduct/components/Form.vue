<template>
	<FormContainer
		class="form"
		:visible
		:title="props.isEdit ? 'Update BloodProduct' : 'Create BloodProduct'"
		:as-dialog
		@close="emit('close')">
		<form @submit.prevent="submit">
			<FormInput
				v-if="!props.hideInputs?.includes('product_type')"
				:required="true"
				:error-message="formErrors.product_type"
				label="Product Type">
				<Select
					v-model="formData.product_type"
					:options="[
						{ title: 'Whole Blood', value: 'Whole Blood' },
						{ title: 'PRBC', value: 'PRBC' },
						{ title: 'Platelets', value: 'Platelets' },
						{ title: 'Plasma', value: 'Plasma' },
					]"
					:show-clear="false"
					:disabled="!!props.forceValues.product_type"
					option-label="title"
					option-value="value" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('storage_temperature')"
				:required="false"
				:error-message="formErrors.storage_temperature"
				label="Storage Temperature">
				<InputText
					v-model="formData.storage_temperature"
					:disabled="!!props.forceValues.storage_temperature" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('shelf_life_days')"
				:required="false"
				:error-message="formErrors.shelf_life_days"
				label="Shelf Life Days">
				<InputNumber
					v-model="formData.shelf_life_days"
					:disabled="!!props.forceValues.shelf_life_days" />
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
import BloodProductsApi from '@/models/BloodProduct/Api'
import type { BloodProduct } from '@/models/BloodProduct/Model'
import { useForm } from '@/helpers/form'
import FormInput from '@/components/FormInput.vue'
import Button from 'primevue/button'
import FormContainer from '@/components/FormContainer.vue'
import InputNumber from 'primevue/inputnumber'
import InputText from 'primevue/inputtext'
import Select from 'primevue/select'

type FormData = {
	product_type: BloodProduct['product_type']
	storage_temperature: string | undefined
	shelf_life_days: number | undefined
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
		id?: BloodProduct['id']
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
	api: () => new BloodProductsApi(),
	defaultData: () =>
		({
			product_type: 'Whole Blood',
			storage_temperature: '',
			shelf_life_days: 0,
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
			router.push({ name: 'blood-products-edit', params: { id: entity!.id } })
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
