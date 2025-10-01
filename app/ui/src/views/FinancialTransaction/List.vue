<template>
	<Header
		:list-state="listState"
		search
		title="FinancialTransactions" />
	<Container>
		<ApiTable
			:list-state="listState"
			@row-click="openDetails">
			<Column header="Date">
				<template #body="slotProps">
					{{ format(new Date(slotProps.data.date), 'yyyy-MM-dd') }}
				</template>
			</Column>
			<Column
				field="amount"
				header="Amount" />
			<Column
				field="description"
				header="Description" />
			<Column
				:style="{ maxWidth: '72px', width: '72px' }"
				header="">
				<template #body="slotProps">
					<ApiTableRemoveButton :item="slotProps.data" />
				</template>
			</Column>
		</ApiTable>
	</Container>
</template>

<script setup lang="ts">
import Header from './components/Header.vue'
import { onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import ApiTable from '@/components/Table/ApiTable.vue'
import Column from 'primevue/column'
import Container from '@/components/Container.vue'
import type { FinancialTransaction } from '@/models/FinancialTransaction/Model'
import { useFinancialTransactionListState } from '@/models/FinancialTransaction/States'
import ApiTableRemoveButton from '@/components/Table/ApiTableRemoveButton.vue'
import { format } from 'date-fns'

const listState = useFinancialTransactionListState()
const router = useRouter()

onBeforeMount(() => {
	listState.getList()
})

function openDetails(item: { data: FinancialTransaction }) {
	router.push({ name: 'financial-transactions-edit', params: { id: item.data.id } })
}
</script>
