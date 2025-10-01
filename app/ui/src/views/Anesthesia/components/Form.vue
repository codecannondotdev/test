<template>
	<FormContainer
		class="form"
		:visible
		:title="props.isEdit ? 'Update Anesthesia' : 'Create Anesthesia'"
		:as-dialog
		@close="emit('close')">
		<form @submit.prevent="submit">
			<FormInput
				v-if="!props.hideInputs?.includes('type')"
				:required="false"
				:error-message="formErrors.type"
				label="Type">
				<Select
					v-model="formData.type"
					:options="[
						{ title: 'General', value: 'General' },
						{ title: 'Regional', value: 'Regional' },
						{ title: 'Local', value: 'Local' },
					]"
					:show-clear="true"
					:disabled="!!props.forceValues.type"
					option-label="title"
					option-value="value" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('start_time')"
				:required="false"
				:error-message="formErrors.start_time"
				label="Start Time">
				<DatePicker
					:model-value="formData.start_time ? new Date(formData.start_time) : undefined"
					:disabled="!!props.forceValues.start_time"
					:show-time="true"
					selectionMode="single"
					@update:model-value="formData.start_time = ($event as Date | null)?.toISOString()" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('end_time')"
				:required="false"
				:error-message="formErrors.end_time"
				label="End Time">
				<DatePicker
					:model-value="formData.end_time ? new Date(formData.end_time) : undefined"
					:disabled="!!props.forceValues.end_time"
					:show-time="true"
					selectionMode="single"
					@update:model-value="formData.end_time = ($event as Date | null)?.toISOString()" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('complications')"
				:required="false"
				:error-message="formErrors.complications"
				label="Complications">
				<Textarea
					v-model="formData.complications"
					:disabled="!!props.forceValues.complications"
					rows="5"
					cols="50" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('anesthesiologist_id')"
				:required="false"
				:error-message="formErrors.anesthesiologist_id"
				label="Anesthesiologist">
				<ModelSelect
					v-model="formData.anesthesiologist_id"
					:api="new DoctorsApi()"
					:disabled="!!props.forceValues.anesthesiologist_id"
					option-label="first_name" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('surgery_id')"
				:required="false"
				:error-message="formErrors.surgery_id"
				label="Surgery">
				<ModelSelect
					v-model="formData.surgery_id"
					:api="new SurgerysApi()"
					:disabled="!!props.forceValues.surgery_id"
					option-label="procedure_name" />
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
import AnesthesiasApi from '@/models/Anesthesia/Api'
import type { Anesthesia } from '@/models/Anesthesia/Model'
import { useForm } from '@/helpers/form'
import FormInput from '@/components/FormInput.vue'
import Button from 'primevue/button'
import FormContainer from '@/components/FormContainer.vue'
import DatePicker from 'primevue/datepicker'
import DoctorsApi from '@/models/Doctor/Api'
import InputText from 'primevue/inputtext'
import ModelSelect from '@/components/ModelSelect.vue'
import Select from 'primevue/select'
import SurgerysApi from '@/models/Surgery/Api'
import Textarea from 'primevue/textarea'

type FormData = {
	type: Anesthesia['type'] | undefined
	start_time: string | undefined
	end_time: string | undefined
	complications: string | undefined
	anesthesiologist_id: number | undefined
	surgery_id: number | undefined
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
		id?: Anesthesia['id']
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
	api: () => new AnesthesiasApi(),
	defaultData: () =>
		({
			type: undefined,
			start_time: '',
			end_time: '',
			complications: '',
			anesthesiologist_id: undefined,
			surgery_id: undefined,
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
			router.push({ name: 'anesthesia-edit', params: { id: entity!.id } })
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
