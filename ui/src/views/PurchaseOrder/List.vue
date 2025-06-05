<template>
	<Header
		:list-state="listState"
		search
		title="PurchaseOrders" />
	<Container>
		<ApiTable
			:list-state="listState"
			@row-click="openDetails">
			<Column
				field="order_number"
				header="Order Number" />
			<Column header="Order Date">
				<template #body="slotProps">
					{{ format(new Date(slotProps.data.order_date), 'yyyy-MM-dd') }}
				</template>
			</Column>
			<Column
				field="quantity_ordered"
				header="Quantity Ordered" />
			<Column
				field="unit_price"
				header="Unit Price" />
			<Column
				field="total_cost"
				header="Total Cost" />
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
import type { PurchaseOrder } from '@/models/PurchaseOrder/Model'
import { usePurchaseOrderListState } from '@/models/PurchaseOrder/States'
import ApiTableRemoveButton from '@/components/Table/ApiTableRemoveButton.vue'
import { format } from 'date-fns'

const listState = usePurchaseOrderListState()
const router = useRouter()

onBeforeMount(() => {
	listState.getList()
})

function openDetails(item: { data: PurchaseOrder }) {
	router.push({ name: 'purchase-orders-edit', params: { id: item.data.id } })
}
</script>
