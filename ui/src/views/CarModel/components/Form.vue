<template>
	<FormContainer
		class="form"
		:visible
		:title="props.isEdit ? 'Update CarModel' : 'Create CarModel'"
		:as-dialog
		@close="emit('close')">
		<form @submit.prevent="submit">
			<FormInput
				v-if="!props.hideInputs?.includes('model_name')"
				:required="true"
				:error-message="formErrors.model_name"
				label="Model Name">
				<InputText
					v-model="formData.model_name"
					:disabled="!!props.forceValues.model_name" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('engine_type')"
				:required="true"
				:error-message="formErrors.engine_type"
				label="Engine Type">
				<Select
					v-model="formData.engine_type"
					:options="[
						{ title: 'Petrol', value: 'Petrol' },
						{ title: 'Diesel', value: 'Diesel' },
						{ title: 'Electric', value: 'Electric' },
						{ title: 'Hybrid', value: 'Hybrid' },
					]"
					:show-clear="false"
					:disabled="!!props.forceValues.engine_type"
					option-label="title"
					option-value="value" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('features')"
				:required="false"
				:error-message="formErrors.features"
				label="Features">
				<Textarea
					v-model="formData.features"
					:disabled="!!props.forceValues.features"
					rows="5"
					cols="50" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('base_price')"
				:required="true"
				:error-message="formErrors.base_price"
				label="Base Price">
				<InputNumber
					v-model="formData.base_price"
					:disabled="!!props.forceValues.base_price"
					:max-fraction-digits="2"
					:max="10000000000" />
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
import CarModelsApi from '@/models/CarModel/Api'
import type { CarModel } from '@/models/CarModel/Model'
import { useForm } from '@/helpers/form'
import FormInput from '@/components/FormInput.vue'
import Button from 'primevue/button'
import FormContainer from '@/components/FormContainer.vue'
import InputNumber from 'primevue/inputnumber'
import InputText from 'primevue/inputtext'
import Select from 'primevue/select'
import Textarea from 'primevue/textarea'

type FormData = {
	model_name: string
	engine_type: CarModel['engine_type']
	features: string | undefined
	base_price: number
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
		id?: CarModel['id']
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
	api: () => new CarModelsApi(),
	defaultData: () =>
		({
			model_name: '',
			engine_type: 'Petrol',
			features: '',
			base_price: 0,
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
			router.push({ name: 'car-models-edit', params: { id: entity!.id } })
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
