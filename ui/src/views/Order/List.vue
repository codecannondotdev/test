<template>
	<Header
		:list-state="listState"
		search
		title="Orders" />
	<Container>
		<ApiTable
			:list-state="listState"
			@row-click="openDetails">
			<Column header="Order Date">
				<template #body="slotProps">
					{{ format(new Date(slotProps.data.order_date), 'yyyy-MM-dd') }}
				</template>
			</Column>
			<Column
				field="status"
				header="Status" />
			<Column
				field="total_amount"
				header="Total Amount" />
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
import type { Order } from '@/models/Order/Model'
import { useOrderListState } from '@/models/Order/States'
import ApiTableRemoveButton from '@/components/Table/ApiTableRemoveButton.vue'
import { format } from 'date-fns'

const listState = useOrderListState()
const router = useRouter()

onBeforeMount(() => {
	listState.getList()
})

function openDetails(item: { data: Order }) {
	router.push({ name: 'orders-edit', params: { id: item.data.id } })
}
</script>
