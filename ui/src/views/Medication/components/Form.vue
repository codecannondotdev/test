<template>
	<FormContainer
		class="form"
		:visible
		:title="props.isEdit ? 'Update Medication' : 'Create Medication'"
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
				v-if="!props.hideInputs?.includes('dosage_form')"
				:required="true"
				:error-message="formErrors.dosage_form"
				label="Dosage Form">
				<InputText
					v-model="formData.dosage_form"
					:disabled="!!props.forceValues.dosage_form" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('strength')"
				:required="false"
				:error-message="formErrors.strength"
				label="Strength">
				<InputText
					v-model="formData.strength"
					:disabled="!!props.forceValues.strength" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('administration_instructions')"
				:required="false"
				:error-message="formErrors.administration_instructions"
				label="Administration Instructions">
				<Textarea
					v-model="formData.administration_instructions"
					:disabled="!!props.forceValues.administration_instructions"
					rows="5"
					cols="50" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('common_side_effects')"
				:required="false"
				:error-message="formErrors.common_side_effects"
				label="Common Side Effects">
				<Textarea
					v-model="formData.common_side_effects"
					:disabled="!!props.forceValues.common_side_effects"
					rows="5"
					cols="50" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('precautions')"
				:required="false"
				:error-message="formErrors.precautions"
				label="Precautions">
				<Textarea
					v-model="formData.precautions"
					:disabled="!!props.forceValues.precautions"
					rows="5"
					cols="50" />
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
import MedicationsApi from '@/models/Medication/Api'
import type { Medication } from '@/models/Medication/Model'
import { useForm } from '@/helpers/form'
import FormInput from '@/components/FormInput.vue'
import Button from 'primevue/button'
import FormContainer from '@/components/FormContainer.vue'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'

type FormData = {
	name: string
	dosage_form: string
	strength: string | undefined
	administration_instructions: string | undefined
	common_side_effects: string | undefined
	precautions: string | undefined
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
		id?: Medication['id']
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
	api: () => new MedicationsApi(),
	defaultData: () =>
		({
			name: '',
			dosage_form: '',
			strength: '',
			administration_instructions: '',
			common_side_effects: '',
			precautions: '',
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
			router.push({ name: 'medications-edit', params: { id: entity!.id } })
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
