<template>
	<Card class="financial-transactions-relation-widget">
		<template #title>
			<h4 class="financial-transactions-relation-widget__title">Financial Transactions</h4>
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
				<Column header="Date">
					<template #body="slotProps">
						{{ format(new Date(slotProps.data.date), 'yyyy-MM-dd') }}
					</template>
				</Column>
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
	<FinancialTransactionsRelationAddDialog
		v-model="isRelationAddDialogActive"
		:ledger-account-id="props.ledgerAccountId"
		@update="refresh()" />
	<FinancialTransactionForm
		:as-dialog="true"
		:visible="isFormActive"
		:should-redirect="false"
		:force-values="{ ledger_account_id: Number(props.ledgerAccountId) }"
		:hide-inputs="['ledger_account_id']"
		@close="isFormActive = false"
		@created="refresh()" />
</template>

<script setup lang="ts">
import { defineProps, onBeforeMount, ref } from 'vue'
import FinancialTransactionsRelationAddDialog from './FinancialTransactionsRelationAddDialog.vue'
import FinancialTransactionForm from '@/views/FinancialTransaction/components/Form.vue'
import Card from 'primevue/card'
import ApiTable from '@/components/Table/ApiTable.vue'
import Column from 'primevue/column'
import Button from 'primevue/button'
import { useRouter } from 'vue-router'
import { useFinancialTransactionListState } from '@/models/FinancialTransaction/States'
import type { FinancialTransaction } from '@/models/FinancialTransaction/Model'
import type { LedgerAccount } from '@/models/LedgerAccount/Model'
import LedgerAccountsApi from '@/models/LedgerAccount/Api'
import { format } from 'date-fns'

const emit = defineEmits(['start-loading', 'stop-loading'])

const props = defineProps<{
	ledgerAccountId: LedgerAccount['id']
}>()

const router = useRouter()
const isRelationAddDialogActive = ref(false)
const isFormActive = ref(false)
const dissociateLoading = ref(null as null | number | string)
const listLoading = ref(false)
const listState = useFinancialTransactionListState()
listState.defaultParams = {
	per_page: 10,
	fromRelation: {
		model: 'App\\Models\\LedgerAccount',
		id: props.ledgerAccountId,
		relation: 'financialTransactions',
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

async function dissociate(item: FinancialTransaction) {
	dissociateLoading.value = item.id
	emit('start-loading')
	try {
		await new LedgerAccountsApi().updateRelation(props.ledgerAccountId, 'financialTransactions', {
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

function openDetails(item: { data: FinancialTransaction }) {
	router.push({ name: 'financial-transactions-edit', params: { id: item.data.id } })
}
</script>

<style lang="scss" scoped>
.financial-transactions-relation-widget {
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

				.financial-transactions-relation-widget__title {
					flex: 1;
					text-align: left;
				}
			}
		}
	}
}
</style>
