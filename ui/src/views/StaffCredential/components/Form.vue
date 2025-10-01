<template>
	<FormContainer
		class="form"
		:visible
		:title="props.isEdit ? 'Update StaffCredential' : 'Create StaffCredential'"
		:as-dialog
		@close="emit('close')">
		<form @submit.prevent="submit">
			<FormInput
				v-if="!props.hideInputs?.includes('type')"
				:required="true"
				:error-message="formErrors.type"
				label="Type">
				<InputText
					v-model="formData.type"
					:disabled="!!props.forceValues.type" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('number')"
				:required="false"
				:error-message="formErrors.number"
				label="Number">
				<InputText
					v-model="formData.number"
					:disabled="!!props.forceValues.number" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('issued_date')"
				:required="false"
				:error-message="formErrors.issued_date"
				label="Issued Date">
				<DatePicker
					:model-value="formData.issued_date ? new Date(formData.issued_date) : undefined"
					:disabled="!!props.forceValues.issued_date"
					selectionMode="single"
					@update:model-value="formData.issued_date = ($event as Date | null)?.toISOString()" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('expiry_date')"
				:required="false"
				:error-message="formErrors.expiry_date"
				label="Expiry Date">
				<DatePicker
					:model-value="formData.expiry_date ? new Date(formData.expiry_date) : undefined"
					:disabled="!!props.forceValues.expiry_date"
					selectionMode="single"
					@update:model-value="formData.expiry_date = ($event as Date | null)?.toISOString()" />
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
import StaffCredentialsApi from '@/models/StaffCredential/Api'
import type { StaffCredential } from '@/models/StaffCredential/Model'
import { useForm } from '@/helpers/form'
import FormInput from '@/components/FormInput.vue'
import Button from 'primevue/button'
import FormContainer from '@/components/FormContainer.vue'
import DatePicker from 'primevue/datepicker'
import InputText from 'primevue/inputtext'

type FormData = {
	type: string
	number: string | undefined
	issued_date: string | undefined
	expiry_date: string | undefined
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
		id?: StaffCredential['id']
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
	api: () => new StaffCredentialsApi(),
	defaultData: () =>
		({
			type: '',
			number: '',
			issued_date: '',
			expiry_date: '',
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
			router.push({ name: 'staff-credentials-edit', params: { id: entity!.id } })
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
