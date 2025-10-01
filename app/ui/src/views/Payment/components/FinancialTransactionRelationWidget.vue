<template>
	<Card class="financial-transaction-relation-widget">
		<template #title>
			<h4 class="financial-transaction-relation-widget__title">Financial Transaction</h4>
			<Button
				v-if="detailsState.details.value?.financial_transaction"
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
			<div class="financial-transaction-relation-widget__content-container">
				<Button
					v-if="!detailsState.details.value?.financial_transaction"
					icon="fal fa-link"
					severity="secondary"
					outlined
					class="financial-transaction-relation-widget__add-button"
					label="Click to add Financial Transaction"
					@click="isRelationAddDialogActive = true" />
				<Card
					v-else
					icon="fal fa-link"
					class="financial-transaction-relation-widget__entity-card"
					@click="openDetails">
					<template #content>
						<p>{{ detailsState.details.value!.financial_transaction!.date }}</p>
						<Button
							class="financial-transaction-relation-widget__dissociate-button"
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
	<FinancialTransactionRelationAddDialog
		v-model="isRelationAddDialogActive"
		:payment-id="props.paymentId"
		@update="refresh()" />
	<FinancialTransactionForm
		:as-dialog="true"
		:visible="isFormActive"
		:should-redirect="false"
		:force-values="{ payment_id: Number(props.paymentId) }"
		:hide-inputs="['payment_id']"
		@close="isFormActive = false"
		@created="refresh()" />
</template>

<script setup lang="ts">
import { defineProps, onBeforeMount, ref } from 'vue'
import FinancialTransactionRelationAddDialog from './FinancialTransactionRelationAddDialog.vue'
import FinancialTransactionForm from '@/views/FinancialTransaction/components/Form.vue'
import Card from 'primevue/card'
import Button from 'primevue/button'
import { useRouter } from 'vue-router'
import { usePaymentDetailsState } from '@/models/Payment/States'
import type { Payment } from '@/models/Payment/Model'
import PaymentsApi from '@/models/Payment/Api'

const emit = defineEmits(['start-loading', 'stop-loading'])

const props = defineProps<{
	paymentId: Payment['id']
}>()

const router = useRouter()
const isRelationAddDialogActive = ref(false)
const isFormActive = ref(false)
const dissociateLoading = ref(false)
const listLoading = ref(false)
const detailsState = usePaymentDetailsState()

onBeforeMount(() => {
	refresh()
})

async function refresh() {
	listLoading.value = true
	emit('start-loading')
	try {
		await detailsState.getDetails(props.paymentId, { with: ['financialTransaction'] })
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
		await new PaymentsApi().updateRelation(props.paymentId, 'financialTransaction', {
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
	router.push({
		name: 'financial-transactions-edit',
		params: { id: detailsState.details.value.id },
	})
}
</script>

<style lang="scss" scoped>
.financial-transaction-relation-widget {
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

				.financial-transaction-relation-widget__title {
					flex: 1;
					text-align: left;
				}
			}
		}
	}

	.financial-transaction-relation-widget__content-container {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		padding: 0 10px 10px;

		.financial-transaction-relation-widget__add-button {
			width: 100%;
		}

		.financial-transaction-relation-widget__entity-card {
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

					.financial-transaction-relation-widget__dissociate-button:hover {
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
