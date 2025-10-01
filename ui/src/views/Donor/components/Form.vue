<template>
	<FormContainer
		class="form"
		:visible
		:title="props.isEdit ? 'Update Donor' : 'Create Donor'"
		:as-dialog
		@close="emit('close')">
		<form @submit.prevent="submit">
			<FormInput
				v-if="!props.hideInputs?.includes('name')"
				:required="true"
				:error-message="formErrors.name"
				label="Name">
				<InputText
					v-model="formData.name"
					:disabled="!!props.forceValues.name" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('donor_identifier')"
				:required="false"
				:error-message="formErrors.donor_identifier"
				label="Donor Identifier">
				<InputText
					v-model="formData.donor_identifier"
					:disabled="!!props.forceValues.donor_identifier" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('blood_type')"
				:required="false"
				:error-message="formErrors.blood_type"
				label="Blood Type">
				<Select
					v-model="formData.blood_type"
					:options="[
						{ title: 'A+', value: 'A+' },
						{ title: 'A-', value: 'A-' },
						{ title: 'B+', value: 'B+' },
						{ title: 'B-', value: 'B-' },
						{ title: 'O+', value: 'O+' },
						{ title: 'O-', value: 'O-' },
						{ title: 'AB+', value: 'AB+' },
						{ title: 'AB-', value: 'AB-' },
					]"
					:show-clear="true"
					:disabled="!!props.forceValues.blood_type"
					option-label="title"
					option-value="value" />
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
import DonorsApi from '@/models/Donor/Api'
import type { Donor } from '@/models/Donor/Model'
import { useForm } from '@/helpers/form'
import FormInput from '@/components/FormInput.vue'
import Button from 'primevue/button'
import FormContainer from '@/components/FormContainer.vue'
import InputText from 'primevue/inputtext'
import Select from 'primevue/select'

type FormData = {
	name: string
	donor_identifier: string | undefined
	blood_type: Donor['blood_type'] | undefined
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
		id?: Donor['id']
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
	api: () => new DonorsApi(),
	defaultData: () =>
		({
			name: '',
			donor_identifier: '',
			blood_type: undefined,
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
			router.push({ name: 'donors-edit', params: { id: entity!.id } })
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
