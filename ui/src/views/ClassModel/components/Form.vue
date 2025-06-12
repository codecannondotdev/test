<template>
	<FormContainer
		class="form"
		:visible
		:title="props.isEdit ? 'Update ClassModel' : 'Create ClassModel'"
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
				v-if="!props.hideInputs?.includes('description')"
				:required="true"
				:error-message="formErrors.description"
				label="Description">
				<Textarea
					v-model="formData.description"
					:disabled="!!props.forceValues.description"
					rows="5"
					cols="50" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('difficulty_level')"
				:required="false"
				:error-message="formErrors.difficulty_level"
				label="Difficulty Level">
				<Select
					v-model="formData.difficulty_level"
					:options="[
						{ title: 'BEGINNER', value: 'BEGINNER' },
						{ title: 'INTERMEDIATE', value: 'INTERMEDIATE' },
						{ title: 'ADVANCED', value: 'ADVANCED' },
					]"
					:show-clear="true"
					:disabled="!!props.forceValues.difficulty_level"
					option-label="title"
					option-value="value" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('duration')"
				:required="true"
				:error-message="formErrors.duration"
				label="Duration">
				<InputText
					v-model="formData.duration"
					:disabled="!!props.forceValues.duration" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('trainer_id')"
				:required="false"
				:error-message="formErrors.trainer_id"
				label="Trainer">
				<ModelSelect
					v-model="formData.trainer_id"
					:api="new TrainersApi()"
					:disabled="!!props.forceValues.trainer_id"
					option-label="first_name" />
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
import ClassModelsApi from '@/models/ClassModel/Api'
import type { ClassModel } from '@/models/ClassModel/Model'
import { useForm } from '@/helpers/form'
import FormInput from '@/components/FormInput.vue'
import Button from 'primevue/button'
import FormContainer from '@/components/FormContainer.vue'
import InputText from 'primevue/inputtext'
import ModelSelect from '@/components/ModelSelect.vue'
import Select from 'primevue/select'
import Textarea from 'primevue/textarea'
import TrainersApi from '@/models/Trainer/Api'

type FormData = {
	name: string
	description: string
	difficulty_level: ClassModel['difficulty_level'] | undefined
	duration: string
	trainer_id: number | undefined
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
		id?: ClassModel['id']
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
	api: () => new ClassModelsApi(),
	defaultData: () =>
		({
			name: '',
			description: '',
			difficulty_level: undefined,
			duration: '',
			trainer_id: undefined,
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
			router.push({ name: 'classes-edit', params: { id: entity!.id } })
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
