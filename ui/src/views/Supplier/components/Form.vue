<template>
	<FormContainer
		class="form"
		:visible
		:title="props.isEdit ? 'Update Supplier' : 'Create Supplier'"
		:as-dialog
		@close="emit('close')">
		<form @submit.prevent="submit">
			<FormInput
				v-if="!props.hideInputs?.includes('company_name')"
				:required="true"
				:error-message="formErrors.company_name"
				label="Company Name">
				<InputText
					v-model="formData.company_name"
					:disabled="!!props.forceValues.company_name" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('contact_person')"
				:required="true"
				:error-message="formErrors.contact_person"
				label="Contact Person">
				<InputText
					v-model="formData.contact_person"
					:disabled="!!props.forceValues.contact_person" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('contact_email')"
				:required="true"
				:error-message="formErrors.contact_email"
				label="Contact Email">
				<InputText
					v-model="formData.contact_email"
					:disabled="!!props.forceValues.contact_email" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('rating')"
				:required="false"
				:error-message="formErrors.rating"
				label="Rating">
				<Select
					v-model="formData.rating"
					:options="[
						{ title: 'A', value: 'A' },
						{ title: 'B', value: 'B' },
						{ title: 'C', value: 'C' },
						{ title: 'D', value: 'D' },
					]"
					:show-clear="true"
					:disabled="!!props.forceValues.rating"
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
import SuppliersApi from '@/models/Supplier/Api'
import type { Supplier } from '@/models/Supplier/Model'
import { useForm } from '@/helpers/form'
import FormInput from '@/components/FormInput.vue'
import Button from 'primevue/button'
import FormContainer from '@/components/FormContainer.vue'
import InputText from 'primevue/inputtext'
import Select from 'primevue/select'

type FormData = {
	company_name: string
	contact_person: string
	contact_email: string
	rating: Supplier['rating'] | undefined
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
		id?: Supplier['id']
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
	api: () => new SuppliersApi(),
	defaultData: () =>
		({
			company_name: '',
			contact_person: '',
			contact_email: '',
			rating: undefined,
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
			router.push({ name: 'suppliers-edit', params: { id: entity!.id } })
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
