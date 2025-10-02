<template>
	<FormContainer
		class="form"
		:visible
		:title="props.isEdit ? 'Update Employee' : 'Create Employee'"
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
				v-if="!props.hideInputs?.includes('email')"
				:required="true"
				:error-message="formErrors.email"
				label="Email">
				<InputText
					v-model="formData.email"
					:disabled="!!props.forceValues.email" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('job_title')"
				:required="true"
				:error-message="formErrors.job_title"
				label="Job Title">
				<InputText
					v-model="formData.job_title"
					:disabled="!!props.forceValues.job_title" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('role_id')"
				:required="false"
				:error-message="formErrors.role_id"
				label="Role">
				<ModelSelect
					v-model="formData.role_id"
					:api="new RolesApi()"
					:disabled="!!props.forceValues.role_id"
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
import EmployeesApi from '@/models/Employee/Api'
import type { Employee } from '@/models/Employee/Model'
import { useForm } from '@/helpers/form'
import FormInput from '@/components/FormInput.vue'
import Button from 'primevue/button'
import FormContainer from '@/components/FormContainer.vue'
import InputText from 'primevue/inputtext'
import ModelSelect from '@/components/ModelSelect.vue'
import RolesApi from '@/models/Role/Api'

type FormData = {
	first_name: string
	last_name: string
	email: string
	job_title: string
	role_id: number | undefined
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
		id?: Employee['id']
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
	api: () => new EmployeesApi(),
	defaultData: () =>
		({
			first_name: '',
			last_name: '',
			email: '',
			job_title: '',
			role_id: undefined,
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
			router.push({ name: 'employees-edit', params: { id: entity!.id } })
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
