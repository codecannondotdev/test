<template>
	<FormContainer
		class="form"
		:visible
		:title="props.isEdit ? 'Update Room' : 'Create Room'"
		:as-dialog
		@close="emit('close')">
		<form @submit.prevent="submit">
			<FormInput
				v-if="!props.hideInputs?.includes('room_number')"
				:required="true"
				:error-message="formErrors.room_number"
				label="Room Number">
				<InputText
					v-model="formData.room_number"
					:disabled="!!props.forceValues.room_number" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('type')"
				:required="false"
				:error-message="formErrors.type"
				label="Type">
				<Select
					v-model="formData.type"
					:options="[
						{ title: 'Clinic', value: 'Clinic' },
						{ title: 'Operating', value: 'Operating' },
						{ title: 'Recovery', value: 'Recovery' },
						{ title: 'Consultation', value: 'Consultation' },
					]"
					:show-clear="true"
					:disabled="!!props.forceValues.type"
					option-label="title"
					option-value="value" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('capacity')"
				:required="false"
				:error-message="formErrors.capacity"
				label="Capacity">
				<InputNumber
					v-model="formData.capacity"
					:disabled="!!props.forceValues.capacity" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('facility_id')"
				:required="false"
				:error-message="formErrors.facility_id"
				label="Facility">
				<ModelSelect
					v-model="formData.facility_id"
					:api="new FacilitysApi()"
					:disabled="!!props.forceValues.facility_id"
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
import RoomsApi from '@/models/Room/Api'
import type { Room } from '@/models/Room/Model'
import { useForm } from '@/helpers/form'
import FormInput from '@/components/FormInput.vue'
import Button from 'primevue/button'
import FormContainer from '@/components/FormContainer.vue'
import FacilitysApi from '@/models/Facility/Api'
import InputNumber from 'primevue/inputnumber'
import InputText from 'primevue/inputtext'
import ModelSelect from '@/components/ModelSelect.vue'
import Select from 'primevue/select'

type FormData = {
	room_number: string
	type: Room['type'] | undefined
	capacity: number | undefined
	facility_id: number | undefined
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
		id?: Room['id']
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
	api: () => new RoomsApi(),
	defaultData: () =>
		({
			room_number: '',
			type: undefined,
			capacity: 0,
			facility_id: undefined,
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
			router.push({ name: 'rooms-edit', params: { id: entity!.id } })
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
