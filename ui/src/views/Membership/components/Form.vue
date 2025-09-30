<template>
	<FormContainer
		class="form"
		:visible
		:title="props.isEdit ? 'Update Membership' : 'Create Membership'"
		:as-dialog
		@close="emit('close')">
		<form @submit.prevent="submit">
			<FormInput
				v-if="!props.hideInputs?.includes('plan_name')"
				:required="true"
				:error-message="formErrors.plan_name"
				label="Plan Name">
				<InputText
					v-model="formData.plan_name"
					:disabled="!!props.forceValues.plan_name" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('price')"
				:required="true"
				:error-message="formErrors.price"
				label="Price">
				<InputNumber
					v-model="formData.price"
					:disabled="!!props.forceValues.price"
					:max-fraction-digits="2"
					:max="10000000000" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('duration_months')"
				:required="false"
				:error-message="formErrors.duration_months"
				label="Duration Months">
				<InputNumber
					v-model="formData.duration_months"
					:disabled="!!props.forceValues.duration_months" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('benefits')"
				:required="false"
				:error-message="formErrors.benefits"
				label="Benefits">
				<Textarea
					v-model="formData.benefits"
					:disabled="!!props.forceValues.benefits"
					rows="5"
					cols="50" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('member_id')"
				:required="false"
				:error-message="formErrors.member_id"
				label="Member">
				<ModelSelect
					v-model="formData.member_id"
					:api="new AsdfasdfasdsApi()"
					:disabled="!!props.forceValues.member_id"
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
import MembershipsApi from '@/models/Membership/Api'
import type { Membership } from '@/models/Membership/Model'
import { useForm } from '@/helpers/form'
import FormInput from '@/components/FormInput.vue'
import Button from 'primevue/button'
import FormContainer from '@/components/FormContainer.vue'
import AsdfasdfasdsApi from '@/models/Asdfasdfasd/Api'
import InputNumber from 'primevue/inputnumber'
import InputText from 'primevue/inputtext'
import ModelSelect from '@/components/ModelSelect.vue'
import Textarea from 'primevue/textarea'

type FormData = {
	plan_name: string
	price: number
	duration_months: number | undefined
	benefits: string | undefined
	member_id: number | undefined
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
		id?: Membership['id']
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
	api: () => new MembershipsApi(),
	defaultData: () =>
		({
			plan_name: '',
			price: 0,
			duration_months: 0,
			benefits: '',
			member_id: undefined,
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
			router.push({ name: 'memberships-edit', params: { id: entity!.id } })
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
