<template>
	<Header
		:list-state="listState"
		search
		title="Expenses" />
	<Container>
		<ApiTable
			:list-state="listState"
			@row-click="openDetails">
			<Column
				field="title"
				header="Title" />
			<Column
				field="amount"
				header="Amount" />
			<Column header="Date Incurred">
				<template #body="slotProps">
					{{ format(new Date(slotProps.data.date_incurred), 'yyyy-MM-dd') }}
				</template>
			</Column>
			<Column header="Payment Date">
				<template #body="slotProps">
					{{ format(new Date(slotProps.data.payment_date), 'yyyy-MM-dd') }}
				</template>
			</Column>
			<Column
				field="status"
				header="Status" />
			<Column
				field="payment_method"
				header="Payment Method" />
			<Column
				field="notes"
				header="Notes" />
			<Column
				field="is_recurring"
				header="Is Recurring" />
			<Column
				field="receipt_attached"
				header="Receipt Attached" />
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
import type { Expense } from '@/models/Expense/Model'
import { useExpenseListState } from '@/models/Expense/States'
import ApiTableRemoveButton from '@/components/Table/ApiTableRemoveButton.vue'
import { format } from 'date-fns'

const listState = useExpenseListState()
const router = useRouter()

onBeforeMount(() => {
	listState.getList()
})

function openDetails(item: { data: Expense }) {
	router.push({ name: 'expenses-edit', params: { id: item.data.id } })
}
</script>
