<template>
	<FormContainer
		class="form"
		:visible
		:title="props.isEdit ? 'Update Karta' : 'Create Karta'"
		:as-dialog
		@close="emit('close')">
		<form @submit.prevent="submit">
			<FormInput
				v-if="!props.hideInputs?.includes('ime')"
				:required="false"
				:error-message="formErrors.ime"
				label="Ime">
				<InputText
					v-model="formData.ime"
					:disabled="!!props.forceValues.ime" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('oceno')"
				:required="false"
				:error-message="formErrors.oceno"
				label="Oceno">
				<InputText
					v-model="formData.oceno"
					:disabled="!!props.forceValues.oceno" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('edition')"
				:required="false"
				:error-message="formErrors.edition"
				label="Edition">
				<InputText
					v-model="formData.edition"
					:disabled="!!props.forceValues.edition" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('card_number')"
				:required="false"
				:error-message="formErrors.card_number"
				label="Card Number">
				<InputText
					v-model="formData.card_number"
					:disabled="!!props.forceValues.card_number" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('condition')"
				:required="false"
				:error-message="formErrors.condition"
				label="Condition">
				<InputText
					v-model="formData.condition"
					:disabled="!!props.forceValues.condition" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('predal_id')"
				:required="false"
				:error-message="formErrors.predal_id"
				label="Predal">
				<ModelSelect
					v-model="formData.predal_id"
					:api="new PredalsApi()"
					:disabled="!!props.forceValues.predal_id"
					option-label="stevilka_predala" />
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
import KartasApi from '@/models/Karta/Api'
import type { Karta } from '@/models/Karta/Model'
import { useForm } from '@/helpers/form'
import FormInput from '@/components/FormInput.vue'
import Button from 'primevue/button'
import FormContainer from '@/components/FormContainer.vue'
import InputText from 'primevue/inputtext'
import ModelSelect from '@/components/ModelSelect.vue'
import PredalsApi from '@/models/Predal/Api'

type FormData = {
	ime: string | undefined
	oceno: string | undefined
	edition: string | undefined
	card_number: string | undefined
	condition: string | undefined
	predal_id: number | undefined
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
		id?: Karta['id']
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
	api: () => new KartasApi(),
	defaultData: () =>
		({
			ime: '',
			oceno: '',
			edition: '',
			card_number: '',
			condition: '',
			predal_id: undefined,
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
			router.push({ name: 'kartas-edit', params: { id: entity!.id } })
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
