<template>
	<FormContainer
		class="form"
		:visible
		:title="props.isEdit ? 'Update FollowUp' : 'Create FollowUp'"
		:as-dialog
		@close="emit('close')">
		<form @submit.prevent="submit">
			<FormInput
				v-if="!props.hideInputs?.includes('follow_up_interval')"
				:required="true"
				:error-message="formErrors.follow_up_interval"
				label="Follow Up Interval">
				<InputText
					v-model="formData.follow_up_interval"
					:disabled="!!props.forceValues.follow_up_interval" />
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
				v-if="!props.hideInputs?.includes('appointment_id')"
				:required="false"
				:error-message="formErrors.appointment_id"
				label="Appointment">
				<ModelSelect
					v-model="formData.appointment_id"
					:api="new AppointmentsApi()"
					:disabled="!!props.forceValues.appointment_id"
					option-label="start_time" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('screening_id')"
				:required="false"
				:error-message="formErrors.screening_id"
				label="Screening">
				<ModelSelect
					v-model="formData.screening_id"
					:api="new ScreeningsApi()"
					:disabled="!!props.forceValues.screening_id"
					option-label="type" />
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
import FollowUpsApi from '@/models/FollowUp/Api'
import type { FollowUp } from '@/models/FollowUp/Model'
import { useForm } from '@/helpers/form'
import FormInput from '@/components/FormInput.vue'
import Button from 'primevue/button'
import FormContainer from '@/components/FormContainer.vue'
import AppointmentsApi from '@/models/Appointment/Api'
import InputText from 'primevue/inputtext'
import ModelSelect from '@/components/ModelSelect.vue'
import ScreeningsApi from '@/models/Screening/Api'
import Textarea from 'primevue/textarea'

type FormData = {
	follow_up_interval: string
	instructions: string | undefined
	appointment_id: number | undefined
	screening_id: number | undefined
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
		id?: FollowUp['id']
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
	api: () => new FollowUpsApi(),
	defaultData: () =>
		({
			follow_up_interval: '',
			instructions: '',
			appointment_id: undefined,
			screening_id: undefined,
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
			router.push({ name: 'follow-ups-edit', params: { id: entity!.id } })
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
