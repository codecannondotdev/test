<template>
	<FormContainer
		class="form"
		:visible
		:title="props.isEdit ? 'Update Tester' : 'Create Tester'"
		:as-dialog
		@close="emit('close')">
		<form @submit.prevent="submit">
			<FormInput
				v-if="!props.hideInputs?.includes('asdfasdfasd')"
				:required="false"
				:error-message="formErrors.asdfasdfasd"
				label="Asdfasdfasd">
				<InputText
					v-model="formData.asdfasdfasd"
					:disabled="!!props.forceValues.asdfasdfasd" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('asdffasdfasdfasdf')"
				:required="true"
				:error-message="formErrors.asdffasdfasdfasdf"
				label="Asdffasdfasdfasdf">
				<Select
					v-model="formData.asdffasdfasdfasdf"
					:options="[
						{ title: 'aaaaaaaaaaaaaaaa', value: 'aaaaaaaaaaaaaaaa' },
						{ title: 'sssssssssssssss', value: 'sssssssssssssss' },
						{ title: 'ddddddddddddddd', value: 'ddddddddddddddd' },
						{ title: 'ssss', value: 'ssss' },
					]"
					:show-clear="false"
					:disabled="!!props.forceValues.asdffasdfasdfasdf"
					option-label="title"
					option-value="value" />
			</FormInput>
			<FormInput
				v-if="!props.hideInputs?.includes('nice_names')"
				:required="true"
				:error-message="formErrors.nice_names"
				label="Nice Names">
				<Select
					v-model="formData.nice_names"
					:options="[
						{ title: 'aaaaaaaaaaaaaaaaaa', value: 'aaaaaaaaaaaaaaaaaa' },
						{ title: 'ssssssssssssssssss', value: 'ssssssssssssssssss' },
						{ title: 'dddddddddddddd', value: 'dddddddddddddd' },
					]"
					:show-clear="false"
					:disabled="!!props.forceValues.nice_names"
					option-label="title"
					option-value="value" />
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
import TestersApi from '@/models/Tester/Api'
import type { Tester } from '@/models/Tester/Model'
import { useForm } from '@/helpers/form'
import FormInput from '@/components/FormInput.vue'
import Button from 'primevue/button'
import FormContainer from '@/components/FormContainer.vue'
import InputText from 'primevue/inputtext'
import Select from 'primevue/select'

type FormData = {
	asdfasdfasd: string | undefined
	asdffasdfasdfasdf: Tester['asdffasdfasdfasdf']
	nice_names: Tester['nice_names']
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
		id?: Tester['id']
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
	api: () => new TestersApi(),
	defaultData: () =>
		({
			asdfasdfasd: '',
			asdffasdfasdfasdf: 'aaaaaaaaaaaaaaaa',
			nice_names: 'aaaaaaaaaaaaaaaaaa',
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
			router.push({ name: 'testers-edit', params: { id: entity!.id } })
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
