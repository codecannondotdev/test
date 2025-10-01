<template>
	<Card class="discharge-relation-widget">
		<template #title>
			<h4 class="discharge-relation-widget__title">Discharge</h4>
			<Button
				v-if="detailsState.details.value?.discharge"
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
			<div class="discharge-relation-widget__content-container">
				<Button
					v-if="!detailsState.details.value?.discharge"
					icon="fal fa-link"
					severity="secondary"
					outlined
					class="discharge-relation-widget__add-button"
					label="Click to add Discharge"
					@click="isRelationAddDialogActive = true" />
				<Card
					v-else
					icon="fal fa-link"
					class="discharge-relation-widget__entity-card"
					@click="openDetails">
					<template #content>
						<p>{{ detailsState.details.value!.discharge!.discharge_date }}</p>
						<Button
							class="discharge-relation-widget__dissociate-button"
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
	<DischargeRelationAddDialog
		v-model="isRelationAddDialogActive"
		:admission-id="props.admissionId"
		@update="refresh()" />
	<DischargeForm
		:as-dialog="true"
		:visible="isFormActive"
		:should-redirect="false"
		:force-values="{ admission_id: Number(props.admissionId) }"
		:hide-inputs="['admission_id']"
		@close="isFormActive = false"
		@created="refresh()" />
</template>

<script setup lang="ts">
import { defineProps, onBeforeMount, ref } from 'vue'
import DischargeRelationAddDialog from './DischargeRelationAddDialog.vue'
import DischargeForm from '@/views/Discharge/components/Form.vue'
import Card from 'primevue/card'
import Button from 'primevue/button'
import { useRouter } from 'vue-router'
import { useAdmissionDetailsState } from '@/models/Admission/States'
import type { Admission } from '@/models/Admission/Model'
import AdmissionsApi from '@/models/Admission/Api'

const emit = defineEmits(['start-loading', 'stop-loading'])

const props = defineProps<{
	admissionId: Admission['id']
}>()

const router = useRouter()
const isRelationAddDialogActive = ref(false)
const isFormActive = ref(false)
const dissociateLoading = ref(false)
const listLoading = ref(false)
const detailsState = useAdmissionDetailsState()

onBeforeMount(() => {
	refresh()
})

async function refresh() {
	listLoading.value = true
	emit('start-loading')
	try {
		await detailsState.getDetails(props.admissionId, { with: ['discharge'] })
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
		await new AdmissionsApi().updateRelation(props.admissionId, 'discharge', {
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
	router.push({ name: 'discharges-edit', params: { id: detailsState.details.value.id } })
}
</script>

<style lang="scss" scoped>
.discharge-relation-widget {
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

				.discharge-relation-widget__title {
					flex: 1;
					text-align: left;
				}
			}
		}
	}

	.discharge-relation-widget__content-container {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		padding: 0 10px 10px;

		.discharge-relation-widget__add-button {
			width: 100%;
		}

		.discharge-relation-widget__entity-card {
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

					.discharge-relation-widget__dissociate-button:hover {
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
