<template>
	<FormContainer
		class="form"
		:visible
		:title="props.isEdit ? 'Update ProductionBatch' : 'Create ProductionBatch'"
		:as-dialog
		@close="emit('close')">
		<form @submit.prevent="submit">
			<FormInput
				v-if="!props.hideInputs?.includes('batch_identifier')"
				:required="true"
				:error-message="formErrors.batch_identifier"
				label="Batch Identifier">
				<InputText
					v-model="formData.batch_identifier"
					:disabled="!!props.forceValues.batch_identifier" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('start_date')"
				:required="true"
				:error-message="formErrors.start_date"
				label="Start Date">
				<DatePicker
					:model-value="formData.start_date ? new Date(formData.start_date) : undefined"
					:disabled="!!props.forceValues.start_date"
					selectionMode="single"
					@update:model-value="formData.start_date = ($event as Date).toISOString()" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('end_date')"
				:required="false"
				:error-message="formErrors.end_date"
				label="End Date">
				<DatePicker
					:model-value="formData.end_date ? new Date(formData.end_date) : undefined"
					:disabled="!!props.forceValues.end_date"
					selectionMode="single"
					@update:model-value="formData.end_date = ($event as Date | null)?.toISOString()" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('quantity_produced')"
				:required="true"
				:error-message="formErrors.quantity_produced"
				label="Quantity Produced">
				<InputNumber
					v-model="formData.quantity_produced"
					:disabled="!!props.forceValues.quantity_produced" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('notes')"
				:required="false"
				:error-message="formErrors.notes"
				label="Notes">
				<Textarea
					v-model="formData.notes"
					:disabled="!!props.forceValues.notes"
					rows="5"
					cols="50" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('factory_id')"
				:required="false"
				:error-message="formErrors.factory_id"
				label="Factory">
				<ModelSelect
					v-model="formData.factory_id"
					:api="new FactorysApi()"
					:disabled="!!props.forceValues.factory_id"
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
import ProductionBatchsApi from '@/models/ProductionBatch/Api'
import type { ProductionBatch } from '@/models/ProductionBatch/Model'
import { useForm } from '@/helpers/form'
import FormInput from '@/components/FormInput.vue'
import Button from 'primevue/button'
import FormContainer from '@/components/FormContainer.vue'
import CarModelsApi from '@/models/CarModel/Api'
import DatePicker from 'primevue/datepicker'
import FactorysApi from '@/models/Factory/Api'
import InputNumber from 'primevue/inputnumber'
import InputText from 'primevue/inputtext'
import ModelSelect from '@/components/ModelSelect.vue'
import Textarea from 'primevue/textarea'

type FormData = {
	batch_identifier: string
	start_date: string
	end_date: string | undefined
	quantity_produced: number
	notes: string | undefined
	factory_id: number | undefined
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
		id?: ProductionBatch['id']
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
	api: () => new ProductionBatchsApi(),
	defaultData: () =>
		({
			batch_identifier: '',
			start_date: '',
			end_date: '',
			quantity_produced: 0,
			notes: '',
			factory_id: undefined,
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
			router.push({ name: 'production-batches-edit', params: { id: entity!.id } })
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
