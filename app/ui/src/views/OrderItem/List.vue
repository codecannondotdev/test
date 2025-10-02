<template>
	<Header
		:list-state="listState"
		search
		title="OrderItems" />
	<Container>
		<ApiTable
			:list-state="listState"
			@row-click="openDetails">
			<Column
				field="item_name"
				header="Item Name" />
			<Column
				field="quantity"
				header="Quantity" />
			<Column
				field="unit_price"
				header="Unit Price" />
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
import type { OrderItem } from '@/models/OrderItem/Model'
import { useOrderItemListState } from '@/models/OrderItem/States'
import ApiTableRemoveButton from '@/components/Table/ApiTableRemoveButton.vue'

const listState = useOrderItemListState()
const router = useRouter()

onBeforeMount(() => {
	listState.getList()
})

function openDetails(item: { data: OrderItem }) {
	router.push({ name: 'order-items-edit', params: { id: item.data.id } })
}
</script>
