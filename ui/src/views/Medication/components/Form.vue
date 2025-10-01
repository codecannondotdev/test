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
				v-if="!props.hideInputs?.includes('formulation')"
				:required="false"
				:error-message="formErrors.formulation"
				label="Formulation">
				<InputText
					v-model="formData.formulation"
					:disabled="!!props.forceValues.formulation" />
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
				v-if="!props.hideInputs?.includes('route')"
				:required="false"
				:error-message="formErrors.route"
				label="Route">
				<Select
					v-model="formData.route"
					:options="[
						{ title: 'ORAL', value: 'ORAL' },
						{ title: 'IV', value: 'IV' },
						{ title: 'IM', value: 'IM' },
						{ title: 'SUBCUTANEOUS', value: 'SUBCUTANEOUS' },
					]"
					:show-clear="true"
					:disabled="!!props.forceValues.route"
					option-label="title"
					option-value="value" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('indications')"
				:required="false"
				:error-message="formErrors.indications"
				label="Indications">
				<Textarea
					v-model="formData.indications"
					:disabled="!!props.forceValues.indications"
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
import Select from 'primevue/select'
import Textarea from 'primevue/textarea'

type FormData = {
	name: string
	formulation: string | undefined
	strength: string | undefined
	route: Medication['route'] | undefined
	indications: string | undefined
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
			formulation: '',
			strength: '',
			route: undefined,
			indications: '',
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
