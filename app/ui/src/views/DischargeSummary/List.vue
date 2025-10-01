<template>
	<Header
		:list-state="listState"
		search
		title="DischargeSummaries" />
	<Container>
		<ApiTable
			:list-state="listState"
			@row-click="openDetails">
			<Column
				field="summary_text"
				header="Summary Text" />
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
import type { DischargeSummary } from '@/models/DischargeSummary/Model'
import { useDischargeSummaryListState } from '@/models/DischargeSummary/States'
import ApiTableRemoveButton from '@/components/Table/ApiTableRemoveButton.vue'

const listState = useDischargeSummaryListState()
const router = useRouter()

onBeforeMount(() => {
	listState.getList()
})

function openDetails(item: { data: DischargeSummary }) {
	router.push({ name: 'discharge-summaries-edit', params: { id: item.data.id } })
}
</script>
