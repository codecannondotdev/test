<template>
	<FormContainer
		class="form"
		:visible
		:title="props.isEdit ? 'Update Transfusion' : 'Create Transfusion'"
		:as-dialog
		@close="emit('close')">
		<form @submit.prevent="submit">
			<FormInput
				v-if="!props.hideInputs?.includes('transfusion_date')"
				:required="true"
				:error-message="formErrors.transfusion_date"
				label="Transfusion Date">
				<DatePicker
					:model-value="formData.transfusion_date ? new Date(formData.transfusion_date) : undefined"
					:disabled="!!props.forceValues.transfusion_date"
					:show-time="true"
					selectionMode="single"
					@update:model-value="formData.transfusion_date = ($event as Date).toISOString()" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('volume')"
				:required="false"
				:error-message="formErrors.volume"
				label="Volume">
				<InputText
					v-model="formData.volume"
					:disabled="!!props.forceValues.volume" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('reaction_observed')"
				:required="false"
				:error-message="formErrors.reaction_observed"
				label="Reaction Observed">
				<Textarea
					v-model="formData.reaction_observed"
					:disabled="!!props.forceValues.reaction_observed"
					rows="5"
					cols="50" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('patient_id')"
				:required="false"
				:error-message="formErrors.patient_id"
				label="Patient">
				<ModelSelect
					v-model="formData.patient_id"
					:api="new PatientsApi()"
					:disabled="!!props.forceValues.patient_id"
					option-label="first_name" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('blood_bank_id')"
				:required="false"
				:error-message="formErrors.blood_bank_id"
				label="Blood Bank">
				<ModelSelect
					v-model="formData.blood_bank_id"
					:api="new BloodBanksApi()"
					:disabled="!!props.forceValues.blood_bank_id"
					option-label="unit_number" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('blood_product_id')"
				:required="false"
				:error-message="formErrors.blood_product_id"
				label="Blood Product">
				<ModelSelect
					v-model="formData.blood_product_id"
					:api="new BloodProductsApi()"
					:disabled="!!props.forceValues.blood_product_id"
					option-label="product_type" />
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
import TransfusionsApi from '@/models/Transfusion/Api'
import type { Transfusion } from '@/models/Transfusion/Model'
import { useForm } from '@/helpers/form'
import FormInput from '@/components/FormInput.vue'
import Button from 'primevue/button'
import FormContainer from '@/components/FormContainer.vue'
import BloodBanksApi from '@/models/BloodBank/Api'
import BloodProductsApi from '@/models/BloodProduct/Api'
import DatePicker from 'primevue/datepicker'
import InputText from 'primevue/inputtext'
import ModelSelect from '@/components/ModelSelect.vue'
import PatientsApi from '@/models/Patient/Api'
import Textarea from 'primevue/textarea'

type FormData = {
	transfusion_date: string
	volume: string | undefined
	reaction_observed: string | undefined
	patient_id: number | undefined
	blood_bank_id: number | undefined
	blood_product_id: number | undefined
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
		id?: Transfusion['id']
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
	api: () => new TransfusionsApi(),
	defaultData: () =>
		({
			transfusion_date: '',
			volume: '',
			reaction_observed: '',
			patient_id: undefined,
			blood_bank_id: undefined,
			blood_product_id: undefined,
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
			router.push({ name: 'transfusions-edit', params: { id: entity!.id } })
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
