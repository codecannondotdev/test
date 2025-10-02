<template>
	<Card class="treatment-relation-widget">
		<template #title>
			<h4 class="treatment-relation-widget__title">Treatment</h4>
			<Button
				v-if="detailsState.details.value?.treatment"
				icon="fal fa-link"
				label="Reconnect"
				outlined
				severity="secondary"
				@click="isRelationAddDialogActive = true" />
			<Button
				icon="fal fa-plus"
				label="Create"
				outlined
				severity="secondary"
				@click="isFormActive = true" />
		</template>
		<template #content>
			<div class="treatment-relation-widget__content-container">
				<Button
					v-if="!detailsState.details.value?.treatment"
					icon="fal fa-link"
					severity="secondary"
					outlined
					class="treatment-relation-widget__add-button"
					label="Click to add Treatment"
					@click="isRelationAddDialogActive = true" />
				<Card
					v-else
					icon="fal fa-link"
					class="treatment-relation-widget__entity-card"
					@click="openDetails">
					<template #content>
						<p>{{ detailsState.details.value!.treatment!.title }}</p>
						<Button
							class="treatment-relation-widget__dissociate-button"
							severity="secondary"
							text
							rounded
							icon="fal fa-times"
							@click.stop="dissociate" />
					</template>
				</Card>
			</div>
		</template>
	</Card>
	<TreatmentRelationAddDialog
		v-model="isRelationAddDialogActive"
		:appointment-id="props.appointmentId"
		@update="refresh()" />
	<TreatmentForm
		:as-dialog="true"
		:visible="isFormActive"
		:should-redirect="false"
		:force-values="{ appointment_id: Number(props.appointmentId) }"
		:hide-inputs="['appointment_id']"
		@close="isFormActive = false"
		@created="refresh()" />
</template>

<script setup lang="ts">
import { defineProps, onBeforeMount, ref } from 'vue'
import TreatmentRelationAddDialog from './TreatmentRelationAddDialog.vue'
import TreatmentForm from '@/views/Treatment/components/Form.vue'
import Card from 'primevue/card'
import Button from 'primevue/button'
import { useRouter } from 'vue-router'
import { useAppointmentDetailsState } from '@/models/Appointment/States'
import type { Appointment } from '@/models/Appointment/Model'
import AppointmentsApi from '@/models/Appointment/Api'

const emit = defineEmits(['start-loading', 'stop-loading'])

const props = defineProps<{
	appointmentId: Appointment['id']
}>()

const router = useRouter()
const isRelationAddDialogActive = ref(false)
const isFormActive = ref(false)
const dissociateLoading = ref(false)
const listLoading = ref(false)
const detailsState = useAppointmentDetailsState()

onBeforeMount(() => {
	refresh()
})

async function refresh() {
	listLoading.value = true
	emit('start-loading')
	try {
		await detailsState.getDetails(props.appointmentId, { with: ['treatment'] })
	} finally {
		listLoading.value = false
		emit('stop-loading')
	}
}

async function dissociate() {
	if (!detailsState.details.value) return
	dissociateLoading.value = true
	emit('start-loading')
	try {
		await new AppointmentsApi().updateRelation(props.appointmentId, 'treatment', {
			method: 'dissociate',
			params: [detailsState.details.value.id],
		})
		dissociateLoading.value = false
		await refresh()
	} finally {
		dissociateLoading.value = false
		emit('stop-loading')
	}
}

function openDetails() {
	if (!detailsState.details.value) return
	router.push({ name: 'treatments-edit', params: { id: detailsState.details.value.id } })
}
</script>

<style lang="scss" scoped>
.treatment-relation-widget {
	width: 100%;
	max-width: 600px;
	overflow: hidden;

	:deep(.p-card-body) {
		padding: 20px 0 0;

		.p-card-caption {
			padding: 0px 20px 12px;

			.p-card-title {
				display: flex;
				align-items: center;
				gap: 10px;

				.treatment-relation-widget__title {
					flex: 1;
					text-align: left;
				}
			}
		}
	}

	.treatment-relation-widget__content-container {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		padding: 0 10px 10px;

		.treatment-relation-widget__add-button {
			width: 100%;
		}

		.treatment-relation-widget__entity-card {
			width: 100%;

			@media (prefers-color-scheme: dark) {
				background: var(--p-surface-800);
			}

			&:hover {
				cursor: pointer;
			}

			:deep(.p-card-body) {
				padding: 0;

				.p-card-content {
					display: flex;
					align-items: center;
					justify-content: space-between;
					width: 100%;
					padding: 10px 10px 10px 20px;

					.treatment-relation-widget__dissociate-button:hover {
						@media (prefers-color-scheme: dark) {
							background: var(--p-surface-700);
						}
					}
				}
			}
		}
	}
}
</style>
