<template>
	<Card class="investigation-relation-widget">
		<template #title>
			<h4 class="investigation-relation-widget__title">Investigation</h4>
			<Button
				v-if="detailsState.details.value?.investigation"
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
			<div class="investigation-relation-widget__content-container">
				<Button
					v-if="!detailsState.details.value?.investigation"
					icon="fal fa-link"
					severity="secondary"
					outlined
					class="investigation-relation-widget__add-button"
					label="Click to add Autopsy Report"
					@click="isRelationAddDialogActive = true" />
				<Card
					v-else
					icon="fal fa-link"
					class="investigation-relation-widget__entity-card"
					@click="openDetails">
					<template #content>
						<p>{{ detailsState.details.value!.investigation!.findings }}</p>
						<Button
							class="investigation-relation-widget__dissociate-button"
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
	<InvestigationRelationAddDialog
		v-model="isRelationAddDialogActive"
		:mortality-report-id="props.mortalityReportId"
		@update="refresh()" />
	<AutopsyReportForm
		:as-dialog="true"
		:visible="isFormActive"
		:should-redirect="false"
		:force-values="{ mortality_report_id: Number(props.mortalityReportId) }"
		:hide-inputs="['mortality_report_id']"
		@close="isFormActive = false"
		@created="refresh()" />
</template>

<script setup lang="ts">
import { defineProps, onBeforeMount, ref } from 'vue'
import InvestigationRelationAddDialog from './InvestigationRelationAddDialog.vue'
import AutopsyReportForm from '@/views/AutopsyReport/components/Form.vue'
import Card from 'primevue/card'
import Button from 'primevue/button'
import { useRouter } from 'vue-router'
import { useMortalityReportDetailsState } from '@/models/MortalityReport/States'
import type { MortalityReport } from '@/models/MortalityReport/Model'
import MortalityReportsApi from '@/models/MortalityReport/Api'

const emit = defineEmits(['start-loading', 'stop-loading'])

const props = defineProps<{
	mortalityReportId: MortalityReport['id']
}>()

const router = useRouter()
const isRelationAddDialogActive = ref(false)
const isFormActive = ref(false)
const dissociateLoading = ref(false)
const listLoading = ref(false)
const detailsState = useMortalityReportDetailsState()

onBeforeMount(() => {
	refresh()
})

async function refresh() {
	listLoading.value = true
	emit('start-loading')
	try {
		await detailsState.getDetails(props.mortalityReportId, { with: ['investigation'] })
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
		await new MortalityReportsApi().updateRelation(props.mortalityReportId, 'investigation', {
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
	router.push({ name: 'autopsy-reports-edit', params: { id: detailsState.details.value.id } })
}
</script>

<style lang="scss" scoped>
.investigation-relation-widget {
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

				.investigation-relation-widget__title {
					flex: 1;
					text-align: left;
				}
			}
		}
	}

	.investigation-relation-widget__content-container {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		padding: 0 10px 10px;

		.investigation-relation-widget__add-button {
			width: 100%;
		}

		.investigation-relation-widget__entity-card {
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

					.investigation-relation-widget__dissociate-button:hover {
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
