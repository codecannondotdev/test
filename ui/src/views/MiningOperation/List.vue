<template>
	<Header
		:list-state="listState"
		search
		title="MiningOperations" />
	<Container>
		<ApiTable
			:list-state="listState"
			@row-click="openDetails">
			<Column header="Extraction Date">
				<template #body="slotProps">
					{{ format(new Date(slotProps.data.extraction_date), 'yyyy-MM-dd') }}
				</template>
			</Column>
			<Column
				field="quantity_extracted"
				header="Quantity Extracted" />
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
import type { MiningOperation } from '@/models/MiningOperation/Model'
import { useMiningOperationListState } from '@/models/MiningOperation/States'
import ApiTableRemoveButton from '@/components/Table/ApiTableRemoveButton.vue'
import { format } from 'date-fns'

const listState = useMiningOperationListState()
const router = useRouter()

onBeforeMount(() => {
	listState.getList()
})

function openDetails(item: { data: MiningOperation }) {
	router.push({ name: 'mining-operations-edit', params: { id: item.data.id } })
}
</script>
