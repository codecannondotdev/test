<template>
	<FormContainer
		class="form"
		:visible
		:title="props.isEdit ? 'Update Sample' : 'Create Sample'"
		:as-dialog
		@close="emit('close')">
		<form @submit.prevent="submit">
			<FormInput
				v-if="!props.hideInputs?.includes('sample_type')"
				:required="true"
				:error-message="formErrors.sample_type"
				label="Sample Type">
				<InputText
					v-model="formData.sample_type"
					:disabled="!!props.forceValues.sample_type" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('collection_time')"
				:required="true"
				:error-message="formErrors.collection_time"
				label="Collection Time">
				<DatePicker
					:model-value="formData.collection_time ? new Date(formData.collection_time) : undefined"
					:disabled="!!props.forceValues.collection_time"
					:show-time="true"
					selectionMode="single"
					@update:model-value="formData.collection_time = ($event as Date).toISOString()" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('condition')"
				:required="false"
				:error-message="formErrors.condition"
				label="Condition">
				<InputText
					v-model="formData.condition"
					:disabled="!!props.forceValues.condition" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('specimen_id')"
				:required="false"
				:error-message="formErrors.specimen_id"
				label="Specimen">
				<ModelSelect
					v-model="formData.specimen_id"
					:api="new SpecimensApi()"
					:disabled="!!props.forceValues.specimen_id"
					option-label="label" />
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
import SamplesApi from '@/models/Sample/Api'
import type { Sample } from '@/models/Sample/Model'
import { useForm } from '@/helpers/form'
import FormInput from '@/components/FormInput.vue'
import Button from 'primevue/button'
import FormContainer from '@/components/FormContainer.vue'
import DatePicker from 'primevue/datepicker'
import InputText from 'primevue/inputtext'
import ModelSelect from '@/components/ModelSelect.vue'
import SpecimensApi from '@/models/Specimen/Api'

type FormData = {
	sample_type: string
	collection_time: string
	condition: string | undefined
	specimen_id: number | undefined
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
		id?: Sample['id']
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
	api: () => new SamplesApi(),
	defaultData: () =>
		({
			sample_type: '',
			collection_time: '',
			condition: '',
			specimen_id: undefined,
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
			router.push({ name: 'samples-edit', params: { id: entity!.id } })
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
