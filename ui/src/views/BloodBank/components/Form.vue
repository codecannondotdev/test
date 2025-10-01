<template>
	<FormContainer
		class="form"
		:visible
		:title="props.isEdit ? 'Update BloodBank' : 'Create BloodBank'"
		:as-dialog
		@close="emit('close')">
		<form @submit.prevent="submit">
			<FormInput
				v-if="!props.hideInputs?.includes('unit_number')"
				:required="true"
				:error-message="formErrors.unit_number"
				label="Unit Number">
				<InputText
					v-model="formData.unit_number"
					:disabled="!!props.forceValues.unit_number" />
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
			<FormInput
				v-if="!props.hideInputs?.includes('status')"
				:required="false"
				:error-message="formErrors.status"
				label="Status">
				<Select
					v-model="formData.status"
					:options="[
						{ title: 'Available', value: 'Available' },
						{ title: 'Transfused', value: 'Transfused' },
						{ title: 'Quarantined', value: 'Quarantined' },
					]"
					:show-clear="true"
					:disabled="!!props.forceValues.status"
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
import BloodBanksApi from '@/models/BloodBank/Api'
import type { BloodBank } from '@/models/BloodBank/Model'
import { useForm } from '@/helpers/form'
import FormInput from '@/components/FormInput.vue'
import Button from 'primevue/button'
import FormContainer from '@/components/FormContainer.vue'
import InputText from 'primevue/inputtext'
import Select from 'primevue/select'

type FormData = {
	unit_number: string
	blood_type: BloodBank['blood_type'] | undefined
	status: BloodBank['status'] | undefined
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
		id?: BloodBank['id']
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
	api: () => new BloodBanksApi(),
	defaultData: () =>
		({
			unit_number: '',
			blood_type: undefined,
			status: undefined,
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
			router.push({ name: 'blood-banks-edit', params: { id: entity!.id } })
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
