<template>
	<Card class="payments-relation-widget">
		<template #title>
			<h4 class="payments-relation-widget__title">Payments</h4>
			<Button
				icon="fal fa-link"
				label="Connect"
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
			<ApiTable
				flat
				:list-state="listState"
				@row-click="openDetails">
				<Column
					field="amount"
					header="Amount" />
				<Column
					header=""
					:style="{ maxWidth: '72px', width: '72px' }">
					<template #body="slotProps">
						<Button
							severity="secondary"
							outlined
							rounded
							icon="fal fa-times"
							:loading="dissociateLoading === slotProps.data.id"
							@click.stop.prevent="dissociate(slotProps.data)" />
					</template>
				</Column>
			</ApiTable>
		</template>
	</Card>
	<PaymentsRelationAddDialog
		v-model="isRelationAddDialogActive"
		:subscription-id="props.subscriptionId"
		@update="refresh()" />
	<PaymentForm
		:as-dialog="true"
		:visible="isFormActive"
		:should-redirect="false"
		:force-values="{ subscription_id: Number(props.subscriptionId) }"
		:hide-inputs="['subscription_id']"
		@close="isFormActive = false"
		@created="refresh()" />
</template>

<script setup lang="ts">
import { defineProps, onBeforeMount, ref } from 'vue'
import PaymentsRelationAddDialog from './PaymentsRelationAddDialog.vue'
import PaymentForm from '@/views/Payment/components/Form.vue'
import Card from 'primevue/card'
import ApiTable from '@/components/Table/ApiTable.vue'
import Column from 'primevue/column'
import Button from 'primevue/button'
import { useRouter } from 'vue-router'
import { usePaymentListState } from '@/models/Payment/States'
import type { Payment } from '@/models/Payment/Model'
import type { Subscription } from '@/models/Subscription/Model'
import SubscriptionsApi from '@/models/Subscription/Api'

const emit = defineEmits(['start-loading', 'stop-loading'])

const props = defineProps<{
	subscriptionId: Subscription['id']
}>()

const router = useRouter()
const isRelationAddDialogActive = ref(false)
const isFormActive = ref(false)
const dissociateLoading = ref(null as null | number | string)
const listLoading = ref(false)
const listState = usePaymentListState()
listState.defaultParams = {
	per_page: 10,
	fromRelation: {
		model: 'App\\Models\\Subscription',
		id: props.subscriptionId,
		relation: 'payments',
	},
}

onBeforeMount(() => {
	refresh()
})

async function refresh() {
	listLoading.value = true
	emit('start-loading')
	try {
		await listState.getList()
	} finally {
		listLoading.value = false
		emit('stop-loading')
	}
}

async function dissociate(item: Payment) {
	dissociateLoading.value = item.id
	emit('start-loading')
	try {
		await new SubscriptionsApi().updateRelation(props.subscriptionId, 'payments', {
			method: 'dissociate',
			params: [item.id],
		})
		dissociateLoading.value = null
		await refresh()
	} finally {
		dissociateLoading.value = null
		emit('stop-loading')
	}
}

function openDetails(item: { data: Payment }) {
	router.push({ name: 'payments-edit', params: { id: item.data.id } })
}
</script>

<style lang="scss" scoped>
.payments-relation-widget {
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

				.payments-relation-widget__title {
					flex: 1;
					text-align: left;
				}
			}
		}
	}
}
</style>
