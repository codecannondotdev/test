<template>
	<FormContainer
		class="form"
		:visible
		:title="props.isEdit ? 'Update Insurance' : 'Create Insurance'"
		:as-dialog
		@close="emit('close')">
		<form @submit.prevent="submit">
			<FormInput
				v-if="!props.hideInputs?.includes('provider_name')"
				:required="true"
				:error-message="formErrors.provider_name"
				label="Provider Name">
				<InputText
					v-model="formData.provider_name"
					:disabled="!!props.forceValues.provider_name" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('policy_number')"
				:required="false"
				:error-message="formErrors.policy_number"
				label="Policy Number">
				<InputText
					v-model="formData.policy_number"
					:disabled="!!props.forceValues.policy_number" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('coverage_type')"
				:required="false"
				:error-message="formErrors.coverage_type"
				label="Coverage Type">
				<InputText
					v-model="formData.coverage_type"
					:disabled="!!props.forceValues.coverage_type" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('preauthorization_required')"
				:error-message="formErrors.preauthorization_required"
				label="Preauthorization Required">
				<template #prepend-input>
					<Checkbox
						v-model="formData.preauthorization_required"
						:disabled="!!props.forceValues.preauthorization_required"
						:binary="true" />
				</template>
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
import InsurancesApi from '@/models/Insurance/Api'
import type { Insurance } from '@/models/Insurance/Model'
import { useForm } from '@/helpers/form'
import FormInput from '@/components/FormInput.vue'
import Button from 'primevue/button'
import FormContainer from '@/components/FormContainer.vue'
import Checkbox from 'primevue/checkbox'
import InputText from 'primevue/inputtext'

type FormData = {
	provider_name: string
	policy_number: string | undefined
	coverage_type: string | undefined
	preauthorization_required: boolean | undefined
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
		id?: Insurance['id']
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
	api: () => new InsurancesApi(),
	defaultData: () =>
		({
			provider_name: '',
			policy_number: '',
			coverage_type: '',
			preauthorization_required: false,
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
			router.push({ name: 'insurances-edit', params: { id: entity!.id } })
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
