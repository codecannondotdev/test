<template>
	<Card class="discharge-summary-relation-widget">
		<template #title>
			<h4 class="discharge-summary-relation-widget__title">Discharge Summary</h4>
			<Button
				v-if="detailsState.details.value?.discharge_summary"
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
			<div class="discharge-summary-relation-widget__content-container">
				<Button
					v-if="!detailsState.details.value?.discharge_summary"
					icon="fal fa-link"
					severity="secondary"
					outlined
					class="discharge-summary-relation-widget__add-button"
					label="Click to add Discharge Summary"
					@click="isRelationAddDialogActive = true" />
				<Card
					v-else
					icon="fal fa-link"
					class="discharge-summary-relation-widget__entity-card"
					@click="openDetails">
					<template #content>
						<p>{{ detailsState.details.value!.discharge_summary!.summary_text }}</p>
						<Button
							class="discharge-summary-relation-widget__dissociate-button"
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
	<DischargeSummaryRelationAddDialog
		v-model="isRelationAddDialogActive"
		:discharge-id="props.dischargeId"
		@update="refresh()" />
	<DischargeSummaryForm
		:as-dialog="true"
		:visible="isFormActive"
		:should-redirect="false"
		:force-values="{ discharge_id: Number(props.dischargeId) }"
		:hide-inputs="['discharge_id']"
		@close="isFormActive = false"
		@created="refresh()" />
</template>

<script setup lang="ts">
import { defineProps, onBeforeMount, ref } from 'vue'
import DischargeSummaryRelationAddDialog from './DischargeSummaryRelationAddDialog.vue'
import DischargeSummaryForm from '@/views/DischargeSummary/components/Form.vue'
import Card from 'primevue/card'
import Button from 'primevue/button'
import { useRouter } from 'vue-router'
import { useDischargeDetailsState } from '@/models/Discharge/States'
import type { Discharge } from '@/models/Discharge/Model'
import DischargesApi from '@/models/Discharge/Api'

const emit = defineEmits(['start-loading', 'stop-loading'])

const props = defineProps<{
	dischargeId: Discharge['id']
}>()

const router = useRouter()
const isRelationAddDialogActive = ref(false)
const isFormActive = ref(false)
const dissociateLoading = ref(false)
const listLoading = ref(false)
const detailsState = useDischargeDetailsState()

onBeforeMount(() => {
	refresh()
})

async function refresh() {
	listLoading.value = true
	emit('start-loading')
	try {
		await detailsState.getDetails(props.dischargeId, { with: ['dischargeSummary'] })
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
		await new DischargesApi().updateRelation(props.dischargeId, 'dischargeSummary', {
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
	router.push({ name: 'discharge-summarys-edit', params: { id: detailsState.details.value.id } })
}
</script>

<style lang="scss" scoped>
.discharge-summary-relation-widget {
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

				.discharge-summary-relation-widget__title {
					flex: 1;
					text-align: left;
				}
			}
		}
	}

	.discharge-summary-relation-widget__content-container {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		padding: 0 10px 10px;

		.discharge-summary-relation-widget__add-button {
			width: 100%;
		}

		.discharge-summary-relation-widget__entity-card {
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

					.discharge-summary-relation-widget__dissociate-button:hover {
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
