<template>
	<FormContainer
		class="form"
		:visible
		:title="props.isEdit ? 'Update Bed' : 'Create Bed'"
		:as-dialog
		@close="emit('close')">
		<form @submit.prevent="submit">
			<FormInput
				v-if="!props.hideInputs?.includes('bed_number')"
				:required="true"
				:error-message="formErrors.bed_number"
				label="Bed Number">
				<InputText
					v-model="formData.bed_number"
					:disabled="!!props.forceValues.bed_number" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('type')"
				:required="false"
				:error-message="formErrors.type"
				label="Type">
				<Select
					v-model="formData.type"
					:options="[
						{ title: 'REGULAR', value: 'REGULAR' },
						{ title: 'ICU', value: 'ICU' },
						{ title: 'PEDIATRIC', value: 'PEDIATRIC' },
					]"
					:show-clear="true"
					:disabled="!!props.forceValues.type"
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
						{ title: 'AVAILABLE', value: 'AVAILABLE' },
						{ title: 'OCCUPIED', value: 'OCCUPIED' },
						{ title: 'MAINTENANCE', value: 'MAINTENANCE' },
					]"
					:show-clear="true"
					:disabled="!!props.forceValues.status"
					option-label="title"
					option-value="value" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('ward_id')"
				:required="false"
				:error-message="formErrors.ward_id"
				label="Ward">
				<ModelSelect
					v-model="formData.ward_id"
					:api="new WardsApi()"
					:disabled="!!props.forceValues.ward_id"
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
import BedsApi from '@/models/Bed/Api'
import type { Bed } from '@/models/Bed/Model'
import { useForm } from '@/helpers/form'
import FormInput from '@/components/FormInput.vue'
import Button from 'primevue/button'
import FormContainer from '@/components/FormContainer.vue'
import InputText from 'primevue/inputtext'
import ModelSelect from '@/components/ModelSelect.vue'
import Select from 'primevue/select'
import WardsApi from '@/models/Ward/Api'

type FormData = {
	bed_number: string
	type: Bed['type'] | undefined
	status: Bed['status'] | undefined
	ward_id: number | undefined
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
		id?: Bed['id']
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
	api: () => new BedsApi(),
	defaultData: () =>
		({
			bed_number: '',
			type: undefined,
			status: undefined,
			ward_id: undefined,
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
			router.push({ name: 'beds-edit', params: { id: entity!.id } })
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
