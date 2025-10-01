<template>
	<FormContainer
		class="form"
		:visible
		:title="props.isEdit ? 'Update HomeCareVisit' : 'Create HomeCareVisit'"
		:as-dialog
		@close="emit('close')">
		<form @submit.prevent="submit">
			<FormInput
				v-if="!props.hideInputs?.includes('visit_date')"
				:required="true"
				:error-message="formErrors.visit_date"
				label="Visit Date">
				<DatePicker
					:model-value="formData.visit_date ? new Date(formData.visit_date) : undefined"
					:disabled="!!props.forceValues.visit_date"
					selectionMode="single"
					@update:model-value="formData.visit_date = ($event as Date).toISOString()" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('services_provided')"
				:required="false"
				:error-message="formErrors.services_provided"
				label="Services Provided">
				<Textarea
					v-model="formData.services_provided"
					:disabled="!!props.forceValues.services_provided"
					rows="5"
					cols="50" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('distance_travelled')"
				:required="false"
				:error-message="formErrors.distance_travelled"
				label="Distance Travelled">
				<Textarea
					v-model="formData.distance_travelled"
					:disabled="!!props.forceValues.distance_travelled"
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
				v-if="!props.hideInputs?.includes('geo_location_id')"
				:required="false"
				:error-message="formErrors.geo_location_id"
				label="Geo Location">
				<ModelSelect
					v-model="formData.geo_location_id"
					:api="new GeoLocationsApi()"
					:disabled="!!props.forceValues.geo_location_id"
					option-label="latitude" />
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
import HomeCareVisitsApi from '@/models/HomeCareVisit/Api'
import type { HomeCareVisit } from '@/models/HomeCareVisit/Model'
import { useForm } from '@/helpers/form'
import FormInput from '@/components/FormInput.vue'
import Button from 'primevue/button'
import FormContainer from '@/components/FormContainer.vue'
import DatePicker from 'primevue/datepicker'
import GeoLocationsApi from '@/models/GeoLocation/Api'
import InputText from 'primevue/inputtext'
import ModelSelect from '@/components/ModelSelect.vue'
import PatientsApi from '@/models/Patient/Api'
import Textarea from 'primevue/textarea'

type FormData = {
	visit_date: string
	services_provided: string | undefined
	distance_travelled: string | undefined
	patient_id: number | undefined
	geo_location_id: number | undefined
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
		id?: HomeCareVisit['id']
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
	api: () => new HomeCareVisitsApi(),
	defaultData: () =>
		({
			visit_date: '',
			services_provided: '',
			distance_travelled: '',
			patient_id: undefined,
			geo_location_id: undefined,
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
			router.push({ name: 'home-care-visits-edit', params: { id: entity!.id } })
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
