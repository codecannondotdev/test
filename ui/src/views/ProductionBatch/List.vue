<template>
	<Header
		:list-state="listState"
		search
		title="ProductionBatches" />
	<Container>
		<ApiTable
			:list-state="listState"
			@row-click="openDetails">
			<Column
				field="batch_identifier"
				header="Batch Identifier" />
			<Column header="Start Date">
				<template #body="slotProps">
					{{ format(new Date(slotProps.data.start_date), 'yyyy-MM-dd') }}
				</template>
			</Column>
			<Column header="End Date">
				<template #body="slotProps">
					{{ format(new Date(slotProps.data.end_date), 'yyyy-MM-dd') }}
				</template>
			</Column>
			<Column
				field="quantity_produced"
				header="Quantity Produced" />
			<Column
				field="notes"
				header="Notes" />
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
import type { ProductionBatch } from '@/models/ProductionBatch/Model'
import { useProductionBatchListState } from '@/models/ProductionBatch/States'
import ApiTableRemoveButton from '@/components/Table/ApiTableRemoveButton.vue'
import { format } from 'date-fns'

const listState = useProductionBatchListState()
const router = useRouter()

onBeforeMount(() => {
	listState.getList()
})

function openDetails(item: { data: ProductionBatch }) {
	router.push({ name: 'production-batches-edit', params: { id: item.data.id } })
}
</script>
