<template>
	<FormContainer
		class="form"
		:visible
		:title="props.isEdit ? 'Update AutopsyReport' : 'Create AutopsyReport'"
		:as-dialog
		@close="emit('close')">
		<form @submit.prevent="submit">
			<FormInput
				v-if="!props.hideInputs?.includes('findings')"
				:required="false"
				:error-message="formErrors.findings"
				label="Findings">
				<Textarea
					v-model="formData.findings"
					:disabled="!!props.forceValues.findings"
					rows="5"
					cols="50" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('conclusion')"
				:required="false"
				:error-message="formErrors.conclusion"
				label="Conclusion">
				<Textarea
					v-model="formData.conclusion"
					:disabled="!!props.forceValues.conclusion"
					rows="5"
					cols="50" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('report_date')"
				:required="false"
				:error-message="formErrors.report_date"
				label="Report Date">
				<DatePicker
					:model-value="formData.report_date ? new Date(formData.report_date) : undefined"
					:disabled="!!props.forceValues.report_date"
					selectionMode="single"
					@update:model-value="formData.report_date = ($event as Date | null)?.toISOString()" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('mortality_report_id')"
				:required="false"
				:error-message="formErrors.mortality_report_id"
				label="Mortality Report">
				<ModelSelect
					v-model="formData.mortality_report_id"
					:api="new MortalityReportsApi()"
					:disabled="!!props.forceValues.mortality_report_id"
					option-label="date_of_death" />
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
import AutopsyReportsApi from '@/models/AutopsyReport/Api'
import type { AutopsyReport } from '@/models/AutopsyReport/Model'
import { useForm } from '@/helpers/form'
import FormInput from '@/components/FormInput.vue'
import Button from 'primevue/button'
import FormContainer from '@/components/FormContainer.vue'
import DatePicker from 'primevue/datepicker'
import InputText from 'primevue/inputtext'
import ModelSelect from '@/components/ModelSelect.vue'
import MortalityReportsApi from '@/models/MortalityReport/Api'
import Textarea from 'primevue/textarea'

type FormData = {
	findings: string | undefined
	conclusion: string | undefined
	report_date: string | undefined
	mortality_report_id: number | undefined
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
		id?: AutopsyReport['id']
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
	api: () => new AutopsyReportsApi(),
	defaultData: () =>
		({
			findings: '',
			conclusion: '',
			report_date: '',
			mortality_report_id: undefined,
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
			router.push({ name: 'autopsy-reports-edit', params: { id: entity!.id } })
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
