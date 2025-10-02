<template>
	<Header
		:list-state="listState"
		search
		title="PurchaseOrderItems" />
	<Container>
		<ApiTable
			:list-state="listState"
			@row-click="openDetails">
			<Column
				field="item_description"
				header="Item Description" />
			<Column
				field="quantity"
				header="Quantity" />
			<Column
				field="unit_cost"
				header="Unit Cost" />
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
import type { PurchaseOrderItem } from '@/models/PurchaseOrderItem/Model'
import { usePurchaseOrderItemListState } from '@/models/PurchaseOrderItem/States'
import ApiTableRemoveButton from '@/components/Table/ApiTableRemoveButton.vue'

const listState = usePurchaseOrderItemListState()
const router = useRouter()

onBeforeMount(() => {
	listState.getList()
})

function openDetails(item: { data: PurchaseOrderItem }) {
	router.push({ name: 'purchase-order-items-edit', params: { id: item.data.id } })
}
</script>
