<template>
	<FormContainer
		class="form"
		:visible
		:title="props.isEdit ? 'Update Nurse' : 'Create Nurse'"
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
				v-if="!props.hideInputs?.includes('license_number')"
				:required="false"
				:error-message="formErrors.license_number"
				label="License Number">
				<InputText
					v-model="formData.license_number"
					:disabled="!!props.forceValues.license_number" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('shift_type')"
				:required="false"
				:error-message="formErrors.shift_type"
				label="Shift Type">
				<Select
					v-model="formData.shift_type"
					:options="[
						{ title: 'DAY', value: 'DAY' },
						{ title: 'NIGHT', value: 'NIGHT' },
						{ title: 'ROTATING', value: 'ROTATING' },
					]"
					:show-clear="true"
					:disabled="!!props.forceValues.shift_type"
					option-label="title"
					option-value="value" />
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
import NursesApi from '@/models/Nurse/Api'
import type { Nurse } from '@/models/Nurse/Model'
import { useForm } from '@/helpers/form'
import FormInput from '@/components/FormInput.vue'
import Button from 'primevue/button'
import FormContainer from '@/components/FormContainer.vue'
import InputText from 'primevue/inputtext'
import Select from 'primevue/select'

type FormData = {
	first_name: string
	last_name: string
	license_number: string | undefined
	shift_type: Nurse['shift_type'] | undefined
	phone: string | undefined
	email: string | undefined
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
		id?: Nurse['id']
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
	api: () => new NursesApi(),
	defaultData: () =>
		({
			first_name: '',
			last_name: '',
			license_number: '',
			shift_type: undefined,
			phone: '',
			email: '',
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
			router.push({ name: 'nurses-edit', params: { id: entity!.id } })
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
