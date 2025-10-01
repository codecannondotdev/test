<template>
	<Card class="pharmacy-order-relation-widget">
		<template #title>
			<h4 class="pharmacy-order-relation-widget__title">Pharmacy Order</h4>
			<Button
				v-if="detailsState.details.value?.pharmacy_order"
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
			<div class="pharmacy-order-relation-widget__content-container">
				<Button
					v-if="!detailsState.details.value?.pharmacy_order"
					icon="fal fa-link"
					severity="secondary"
					outlined
					class="pharmacy-order-relation-widget__add-button"
					label="Click to add Pharmacy Order"
					@click="isRelationAddDialogActive = true" />
				<Card
					v-else
					icon="fal fa-link"
					class="pharmacy-order-relation-widget__entity-card"
					@click="openDetails">
					<template #content>
						<p>{{ detailsState.details.value!.pharmacy_order!.order_date }}</p>
						<Button
							class="pharmacy-order-relation-widget__dissociate-button"
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
	<PharmacyOrderRelationAddDialog
		v-model="isRelationAddDialogActive"
		:prescription-id="props.prescriptionId"
		@update="refresh()" />
	<PharmacyOrderForm
		:as-dialog="true"
		:visible="isFormActive"
		:should-redirect="false"
		:force-values="{ prescription_id: Number(props.prescriptionId) }"
		:hide-inputs="['prescription_id']"
		@close="isFormActive = false"
		@created="refresh()" />
</template>

<script setup lang="ts">
import { defineProps, onBeforeMount, ref } from 'vue'
import PharmacyOrderRelationAddDialog from './PharmacyOrderRelationAddDialog.vue'
import PharmacyOrderForm from '@/views/PharmacyOrder/components/Form.vue'
import Card from 'primevue/card'
import Button from 'primevue/button'
import { useRouter } from 'vue-router'
import { usePrescriptionDetailsState } from '@/models/Prescription/States'
import type { Prescription } from '@/models/Prescription/Model'
import PrescriptionsApi from '@/models/Prescription/Api'

const emit = defineEmits(['start-loading', 'stop-loading'])

const props = defineProps<{
	prescriptionId: Prescription['id']
}>()

const router = useRouter()
const isRelationAddDialogActive = ref(false)
const isFormActive = ref(false)
const dissociateLoading = ref(false)
const listLoading = ref(false)
const detailsState = usePrescriptionDetailsState()

onBeforeMount(() => {
	refresh()
})

async function refresh() {
	listLoading.value = true
	emit('start-loading')
	try {
		await detailsState.getDetails(props.prescriptionId, { with: ['pharmacyOrder'] })
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
		await new PrescriptionsApi().updateRelation(props.prescriptionId, 'pharmacyOrder', {
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
	router.push({ name: 'pharmacy-orders-edit', params: { id: detailsState.details.value.id } })
}
</script>

<style lang="scss" scoped>
.pharmacy-order-relation-widget {
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

				.pharmacy-order-relation-widget__title {
					flex: 1;
					text-align: left;
				}
			}
		}
	}

	.pharmacy-order-relation-widget__content-container {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		padding: 0 10px 10px;

		.pharmacy-order-relation-widget__add-button {
			width: 100%;
		}

		.pharmacy-order-relation-widget__entity-card {
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

					.pharmacy-order-relation-widget__dissociate-button:hover {
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
