<template>
	<FormContainer
		class="form"
		:visible
		:title="props.isEdit ? 'Update PalliativeCarePlan' : 'Create PalliativeCarePlan'"
		:as-dialog
		@close="emit('close')">
		<form @submit.prevent="submit">
			<FormInput
				v-if="!props.hideInputs?.includes('goals')"
				:required="false"
				:error-message="formErrors.goals"
				label="Goals">
				<Textarea
					v-model="formData.goals"
					:disabled="!!props.forceValues.goals"
					rows="5"
					cols="50" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('medications')"
				:required="false"
				:error-message="formErrors.medications"
				label="Medications">
				<Textarea
					v-model="formData.medications"
					:disabled="!!props.forceValues.medications"
					rows="5"
					cols="50" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('advance_directives')"
				:required="false"
				:error-message="formErrors.advance_directives"
				label="Advance Directives">
				<Textarea
					v-model="formData.advance_directives"
					:disabled="!!props.forceValues.advance_directives"
					rows="5"
					cols="50" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('patient_id')"
				:required="false"
				:error-message="formErrors.patient_id"
				label="Patient">
				<ModelSelect
					v-model="formData.patient_id"
					:api="new PatientsApi()"
					:disabled="!!props.forceValues.patient_id"
					option-label="first_name" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('care_team_id')"
				:required="false"
				:error-message="formErrors.care_team_id"
				label="Care Team">
				<ModelSelect
					v-model="formData.care_team_id"
					:api="new CareTeamsApi()"
					:disabled="!!props.forceValues.care_team_id"
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
import PalliativeCarePlansApi from '@/models/PalliativeCarePlan/Api'
import type { PalliativeCarePlan } from '@/models/PalliativeCarePlan/Model'
import { useForm } from '@/helpers/form'
import FormInput from '@/components/FormInput.vue'
import Button from 'primevue/button'
import FormContainer from '@/components/FormContainer.vue'
import CareTeamsApi from '@/models/CareTeam/Api'
import InputText from 'primevue/inputtext'
import ModelSelect from '@/components/ModelSelect.vue'
import PatientsApi from '@/models/Patient/Api'
import Textarea from 'primevue/textarea'

type FormData = {
	goals: string | undefined
	medications: string | undefined
	advance_directives: string | undefined
	patient_id: number | undefined
	care_team_id: number | undefined
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
		id?: PalliativeCarePlan['id']
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
	api: () => new PalliativeCarePlansApi(),
	defaultData: () =>
		({
			goals: '',
			medications: '',
			advance_directives: '',
			patient_id: undefined,
			care_team_id: undefined,
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
			router.push({ name: 'palliative-care-plans-edit', params: { id: entity!.id } })
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
