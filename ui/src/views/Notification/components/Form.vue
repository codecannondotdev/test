<template>
	<FormContainer
		class="form"
		:visible
		:title="props.isEdit ? 'Update Notification' : 'Create Notification'"
		:as-dialog
		@close="emit('close')">
		<form @submit.prevent="submit">
			<FormInput
				v-if="!props.hideInputs?.includes('title')"
				:required="true"
				:error-message="formErrors.title"
				label="Title">
				<InputText
					v-model="formData.title"
					:disabled="!!props.forceValues.title" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('body')"
				:required="true"
				:error-message="formErrors.body"
				label="Body">
				<Textarea
					v-model="formData.body"
					:disabled="!!props.forceValues.body"
					rows="5"
					cols="50" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('sent_at')"
				:required="false"
				:error-message="formErrors.sent_at"
				label="Sent At">
				<DatePicker
					:model-value="formData.sent_at ? new Date(formData.sent_at) : undefined"
					:disabled="!!props.forceValues.sent_at"
					:show-time="true"
					selectionMode="single"
					@update:model-value="formData.sent_at = ($event as Date | null)?.toISOString()" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('read')"
				:error-message="formErrors.read"
				label="Read">
				<template #prepend-input>
					<Checkbox
						v-model="formData.read"
						:disabled="!!props.forceValues.read"
						:binary="true" />
				</template>
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('related_patient_id')"
				:required="false"
				:error-message="formErrors.related_patient_id"
				label="Related Patient">
				<ModelSelect
					v-model="formData.related_patient_id"
					:api="new PatientsApi()"
					:disabled="!!props.forceValues.related_patient_id"
					option-label="first_name" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('allergy_id')"
				:required="false"
				:error-message="formErrors.allergy_id"
				label="Allergy">
				<ModelSelect
					v-model="formData.allergy_id"
					:api="new AllergysApi()"
					:disabled="!!props.forceValues.allergy_id"
					option-label="allergen" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('contact_id')"
				:required="false"
				:error-message="formErrors.contact_id"
				label="Contact">
				<ModelSelect
					v-model="formData.contact_id"
					:api="new FamilyContactsApi()"
					:disabled="!!props.forceValues.contact_id"
					option-label="name" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('credential_id')"
				:required="false"
				:error-message="formErrors.credential_id"
				label="Credential">
				<ModelSelect
					v-model="formData.credential_id"
					:api="new StaffCredentialsApi()"
					:disabled="!!props.forceValues.credential_id"
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
import NotificationsApi from '@/models/Notification/Api'
import type { Notification } from '@/models/Notification/Model'
import { useForm } from '@/helpers/form'
import FormInput from '@/components/FormInput.vue'
import Button from 'primevue/button'
import FormContainer from '@/components/FormContainer.vue'
import AllergysApi from '@/models/Allergy/Api'
import Checkbox from 'primevue/checkbox'
import DatePicker from 'primevue/datepicker'
import FamilyContactsApi from '@/models/FamilyContact/Api'
import InputText from 'primevue/inputtext'
import ModelSelect from '@/components/ModelSelect.vue'
import PatientsApi from '@/models/Patient/Api'
import StaffCredentialsApi from '@/models/StaffCredential/Api'
import Textarea from 'primevue/textarea'

type FormData = {
	title: string
	body: string
	sent_at: string | undefined
	read: boolean | undefined
	related_patient_id: number | undefined
	allergy_id: number | undefined
	contact_id: number | undefined
	credential_id: number | undefined
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
		id?: Notification['id']
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
	api: () => new NotificationsApi(),
	defaultData: () =>
		({
			title: '',
			body: '',
			sent_at: '',
			read: false,
			related_patient_id: undefined,
			allergy_id: undefined,
			contact_id: undefined,
			credential_id: undefined,
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
			router.push({ name: 'notifications-edit', params: { id: entity!.id } })
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
