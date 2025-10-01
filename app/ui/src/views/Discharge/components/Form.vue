<template>
	<FormContainer
		class="form"
		:visible
		:title="props.isEdit ? 'Update Discharge' : 'Create Discharge'"
		:as-dialog
		@close="emit('close')">
		<form @submit.prevent="submit">
			<FormInput
				v-if="!props.hideInputs?.includes('discharge_date')"
				:required="true"
				:error-message="formErrors.discharge_date"
				label="Discharge Date">
				<DatePicker
					:model-value="formData.discharge_date ? new Date(formData.discharge_date) : undefined"
					:disabled="!!props.forceValues.discharge_date"
					:show-time="true"
					selectionMode="single"
					@update:model-value="formData.discharge_date = ($event as Date).toISOString()" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('condition_at_discharge')"
				:required="false"
				:error-message="formErrors.condition_at_discharge"
				label="Condition At Discharge">
				<Textarea
					v-model="formData.condition_at_discharge"
					:disabled="!!props.forceValues.condition_at_discharge"
					rows="5"
					cols="50" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('instructions')"
				:required="false"
				:error-message="formErrors.instructions"
				label="Instructions">
				<Textarea
					v-model="formData.instructions"
					:disabled="!!props.forceValues.instructions"
					rows="5"
					cols="50" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('admission_id')"
				:required="false"
				:error-message="formErrors.admission_id"
				label="Admission">
				<ModelSelect
					v-model="formData.admission_id"
					:api="new AdmissionsApi()"
					:disabled="!!props.forceValues.admission_id"
					option-label="admission_date" />
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
import DischargesApi from '@/models/Discharge/Api'
import type { Discharge } from '@/models/Discharge/Model'
import { useForm } from '@/helpers/form'
import FormInput from '@/components/FormInput.vue'
import Button from 'primevue/button'
import FormContainer from '@/components/FormContainer.vue'
import AdmissionsApi from '@/models/Admission/Api'
import DatePicker from 'primevue/datepicker'
import InputText from 'primevue/inputtext'
import ModelSelect from '@/components/ModelSelect.vue'
import Textarea from 'primevue/textarea'

type FormData = {
	discharge_date: string
	condition_at_discharge: string | undefined
	instructions: string | undefined
	admission_id: number | undefined
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
		id?: Discharge['id']
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
	api: () => new DischargesApi(),
	defaultData: () =>
		({
			discharge_date: '',
			condition_at_discharge: '',
			instructions: '',
			admission_id: undefined,
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
			router.push({ name: 'discharges-edit', params: { id: entity!.id } })
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
