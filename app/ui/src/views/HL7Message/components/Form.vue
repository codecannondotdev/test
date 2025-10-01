<template>
	<FormContainer
		class="form"
		:visible
		:title="props.isEdit ? 'Update HL7Message' : 'Create HL7Message'"
		:as-dialog
		@close="emit('close')">
		<form @submit.prevent="submit">
			<FormInput
				v-if="!props.hideInputs?.includes('message_type')"
				:required="true"
				:error-message="formErrors.message_type"
				label="Message Type">
				<InputText
					v-model="formData.message_type"
					:disabled="!!props.forceValues.message_type" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('received_at')"
				:required="true"
				:error-message="formErrors.received_at"
				label="Received At">
				<DatePicker
					:model-value="formData.received_at ? new Date(formData.received_at) : undefined"
					:disabled="!!props.forceValues.received_at"
					:show-time="true"
					selectionMode="single"
					@update:model-value="formData.received_at = ($event as Date).toISOString()" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('payload')"
				:required="false"
				:error-message="formErrors.payload"
				label="Payload">
				<Textarea
					v-model="formData.payload"
					:disabled="!!props.forceValues.payload"
					rows="5"
					cols="50" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('integration_id')"
				:required="false"
				:error-message="formErrors.integration_id"
				label="Integration">
				<ModelSelect
					v-model="formData.integration_id"
					:api="new IntegrationsApi()"
					:disabled="!!props.forceValues.integration_id"
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
import HL7MessagesApi from '@/models/HL7Message/Api'
import type { HL7Message } from '@/models/HL7Message/Model'
import { useForm } from '@/helpers/form'
import FormInput from '@/components/FormInput.vue'
import Button from 'primevue/button'
import FormContainer from '@/components/FormContainer.vue'
import DatePicker from 'primevue/datepicker'
import InputText from 'primevue/inputtext'
import IntegrationsApi from '@/models/Integration/Api'
import ModelSelect from '@/components/ModelSelect.vue'
import Textarea from 'primevue/textarea'

type FormData = {
	message_type: string
	received_at: string
	payload: string | undefined
	integration_id: number | undefined
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
		id?: HL7Message['id']
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
	api: () => new HL7MessagesApi(),
	defaultData: () =>
		({
			message_type: '',
			received_at: '',
			payload: '',
			integration_id: undefined,
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
			router.push({ name: 'hl7-messages-edit', params: { id: entity!.id } })
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
