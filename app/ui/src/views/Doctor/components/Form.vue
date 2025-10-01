<template>
	<FormContainer
		class="form"
		:visible
		:title="props.isEdit ? 'Update Doctor' : 'Create Doctor'"
		:as-dialog
		@close="emit('close')">
		<form @submit.prevent="submit">
			<FormInput
				v-if="!props.hideInputs?.includes('first_name')"
				:required="true"
				:error-message="formErrors.first_name"
				label="First Name">
				<InputText
					v-model="formData.first_name"
					:disabled="!!props.forceValues.first_name" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('last_name')"
				:required="true"
				:error-message="formErrors.last_name"
				label="Last Name">
				<InputText
					v-model="formData.last_name"
					:disabled="!!props.forceValues.last_name" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('specialty')"
				:required="true"
				:error-message="formErrors.specialty"
				label="Specialty">
				<InputText
					v-model="formData.specialty"
					:disabled="!!props.forceValues.specialty" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('phone')"
				:required="false"
				:error-message="formErrors.phone"
				label="Phone">
				<InputText
					v-model="formData.phone"
					:disabled="!!props.forceValues.phone" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('email')"
				:required="false"
				:error-message="formErrors.email"
				label="Email">
				<InputText
					v-model="formData.email"
					:disabled="!!props.forceValues.email" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('license_number')"
				:required="true"
				:error-message="formErrors.license_number"
				label="License Number">
				<InputText
					v-model="formData.license_number"
					:disabled="!!props.forceValues.license_number" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('consulation_fee')"
				:required="false"
				:error-message="formErrors.consulation_fee"
				label="Consulation Fee">
				<InputNumber
					v-model="formData.consulation_fee"
					:disabled="!!props.forceValues.consulation_fee"
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
import DoctorsApi from '@/models/Doctor/Api'
import type { Doctor } from '@/models/Doctor/Model'
import { useForm } from '@/helpers/form'
import FormInput from '@/components/FormInput.vue'
import Button from 'primevue/button'
import FormContainer from '@/components/FormContainer.vue'
import InputNumber from 'primevue/inputnumber'
import InputText from 'primevue/inputtext'

type FormData = {
	first_name: string
	last_name: string
	specialty: string
	phone: string | undefined
	email: string | undefined
	license_number: string
	consulation_fee: number | undefined
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
		id?: Doctor['id']
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
	api: () => new DoctorsApi(),
	defaultData: () =>
		({
			first_name: '',
			last_name: '',
			specialty: '',
			phone: '',
			email: '',
			license_number: '',
			consulation_fee: 0,
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
			router.push({ name: 'doctors-edit', params: { id: entity!.id } })
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
