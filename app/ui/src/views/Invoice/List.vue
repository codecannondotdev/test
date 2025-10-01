<template>
	<Header
		:list-state="listState"
		search
		title="Invoices" />
	<Container>
		<ApiTable
			:list-state="listState"
			@row-click="openDetails">
			<Column
				field="invoice_number"
				header="Invoice Number" />
			<Column header="Issue Date">
				<template #body="slotProps">
					{{ format(new Date(slotProps.data.issue_date), 'yyyy-MM-dd') }}
				</template>
			</Column>
			<Column header="Due Date">
				<template #body="slotProps">
					{{ format(new Date(slotProps.data.due_date), 'yyyy-MM-dd') }}
				</template>
			</Column>
			<Column
				field="total_amount"
				header="Total Amount" />
			<Column
				field="status"
				header="Status" />
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
import type { Invoice } from '@/models/Invoice/Model'
import { useInvoiceListState } from '@/models/Invoice/States'
import ApiTableRemoveButton from '@/components/Table/ApiTableRemoveButton.vue'
import { format } from 'date-fns'

const listState = useInvoiceListState()
const router = useRouter()

onBeforeMount(() => {
	listState.getList()
})

function openDetails(item: { data: Invoice }) {
	router.push({ name: 'invoices-edit', params: { id: item.data.id } })
}
</script>
