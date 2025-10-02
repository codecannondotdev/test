<template>
	<Header
		:list-state="listState"
		search
		title="Inventories" />
	<Container>
		<ApiTable
			:list-state="listState"
			@row-click="openDetails">
			<Column
				field="item_name"
				header="Item Name" />
			<Column
				field="stock_quantity"
				header="Stock Quantity" />
			<Column
				field="reorder_level"
				header="Reorder Level" />
			<Column header="Last Updated">
				<template #body="slotProps">
					{{ format(new Date(slotProps.data.last_updated), 'yyyy-MM-dd') }}
				</template>
			</Column>
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
import type { Inventory } from '@/models/Inventory/Model'
import { useInventoryListState } from '@/models/Inventory/States'
import ApiTableRemoveButton from '@/components/Table/ApiTableRemoveButton.vue'
import { format } from 'date-fns'

const listState = useInventoryListState()
const router = useRouter()

onBeforeMount(() => {
	listState.getList()
})

function openDetails(item: { data: Inventory }) {
	router.push({ name: 'inventories-edit', params: { id: item.data.id } })
}
</script>
