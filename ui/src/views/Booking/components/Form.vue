<template>
	<FormContainer
		class="form"
		:visible
		:title="props.isEdit ? 'Update Booking' : 'Create Booking'"
		:as-dialog
		@close="emit('close')">
		<form @submit.prevent="submit">
			<FormInput
				v-if="!props.hideInputs?.includes('booking_date')"
				:required="true"
				:error-message="formErrors.booking_date"
				label="Booking Date">
				<DatePicker
					:model-value="formData.booking_date ? new Date(formData.booking_date) : undefined"
					:disabled="!!props.forceValues.booking_date"
					:show-time="true"
					selectionMode="single"
					@update:model-value="formData.booking_date = ($event as Date).toISOString()" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('status')"
				:required="false"
				:error-message="formErrors.status"
				label="Status">
				<Select
					v-model="formData.status"
					:options="[
						{ title: 'CONFIRMED', value: 'CONFIRMED' },
						{ title: 'PENDING', value: 'PENDING' },
						{ title: 'CANCELLED', value: 'CANCELLED' },
					]"
					:show-clear="true"
					:disabled="!!props.forceValues.status"
					option-label="title"
					option-value="value" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('member_id')"
				:required="false"
				:error-message="formErrors.member_id"
				label="Member">
				<ModelSelect
					v-model="formData.member_id"
					:api="new AsdfasdfasdsApi()"
					:disabled="!!props.forceValues.member_id"
					option-label="first_name" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('fitness_class_id')"
				:required="false"
				:error-message="formErrors.fitness_class_id"
				label="Fitness Class">
				<ModelSelect
					v-model="formData.fitness_class_id"
					:api="new FitnessClasssApi()"
					:disabled="!!props.forceValues.fitness_class_id"
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
import BookingsApi from '@/models/Booking/Api'
import type { Booking } from '@/models/Booking/Model'
import { useForm } from '@/helpers/form'
import FormInput from '@/components/FormInput.vue'
import Button from 'primevue/button'
import FormContainer from '@/components/FormContainer.vue'
import AsdfasdfasdsApi from '@/models/Asdfasdfasd/Api'
import DatePicker from 'primevue/datepicker'
import FitnessClasssApi from '@/models/FitnessClass/Api'
import InputText from 'primevue/inputtext'
import ModelSelect from '@/components/ModelSelect.vue'
import Select from 'primevue/select'

type FormData = {
	booking_date: string
	status: Booking['status'] | undefined
	member_id: number | undefined
	fitness_class_id: number | undefined
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
		id?: Booking['id']
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
	api: () => new BookingsApi(),
	defaultData: () =>
		({
			booking_date: '',
			status: undefined,
			member_id: undefined,
			fitness_class_id: undefined,
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
			router.push({ name: 'bookings-edit', params: { id: entity!.id } })
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
