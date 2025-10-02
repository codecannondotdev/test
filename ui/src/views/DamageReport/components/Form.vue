<template>
	<FormContainer
		class="form"
		:visible
		:title="props.isEdit ? 'Update DamageReport' : 'Create DamageReport'"
		:as-dialog
		@close="emit('close')">
		<form @submit.prevent="submit">
			<FormInput
				v-if="!props.hideInputs?.includes('report_date')"
				:required="true"
				:error-message="formErrors.report_date"
				label="Report Date">
				<DatePicker
					:model-value="formData.report_date ? new Date(formData.report_date) : undefined"
					:disabled="!!props.forceValues.report_date"
					selectionMode="single"
					@update:model-value="formData.report_date = ($event as Date).toISOString()" />
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
				v-if="!props.hideInputs?.includes('severity')"
				:required="false"
				:error-message="formErrors.severity"
				label="Severity">
				<Select
					v-model="formData.severity"
					:options="[
						{ title: 'MINOR', value: 'MINOR' },
						{ title: 'MAJOR', value: 'MAJOR' },
						{ title: 'CRITICAL', value: 'CRITICAL' },
					]"
					:show-clear="true"
					:disabled="!!props.forceValues.severity"
					option-label="title"
					option-value="value" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('employee_id')"
				:required="false"
				:error-message="formErrors.employee_id"
				label="Employee">
				<ModelSelect
					v-model="formData.employee_id"
					:api="new EmployeesApi()"
					:disabled="!!props.forceValues.employee_id"
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
import DamageReportsApi from '@/models/DamageReport/Api'
import type { DamageReport } from '@/models/DamageReport/Model'
import { useForm } from '@/helpers/form'
import FormInput from '@/components/FormInput.vue'
import Button from 'primevue/button'
import FormContainer from '@/components/FormContainer.vue'
import DatePicker from 'primevue/datepicker'
import EmployeesApi from '@/models/Employee/Api'
import InputText from 'primevue/inputtext'
import ModelSelect from '@/components/ModelSelect.vue'
import Select from 'primevue/select'
import Textarea from 'primevue/textarea'

type FormData = {
	report_date: string
	description: string
	severity: DamageReport['severity'] | undefined
	employee_id: number | undefined
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
		id?: DamageReport['id']
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
	api: () => new DamageReportsApi(),
	defaultData: () =>
		({
			report_date: '',
			description: '',
			severity: undefined,
			employee_id: undefined,
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
			router.push({ name: 'damage-reports-edit', params: { id: entity!.id } })
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
