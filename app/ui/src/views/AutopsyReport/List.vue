<template>
	<Header
		:list-state="listState"
		search
		title="AutopsyReports" />
	<Container>
		<ApiTable
			:list-state="listState"
			@row-click="openDetails">
			<Column
				field="findings"
				header="Findings" />
			<Column
				field="conclusion"
				header="Conclusion" />
			<Column header="Report Date">
				<template #body="slotProps">
					{{ format(new Date(slotProps.data.report_date), 'yyyy-MM-dd') }}
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
import type { AutopsyReport } from '@/models/AutopsyReport/Model'
import { useAutopsyReportListState } from '@/models/AutopsyReport/States'
import ApiTableRemoveButton from '@/components/Table/ApiTableRemoveButton.vue'
import { format } from 'date-fns'

const listState = useAutopsyReportListState()
const router = useRouter()

onBeforeMount(() => {
	listState.getList()
})

function openDetails(item: { data: AutopsyReport }) {
	router.push({ name: 'autopsy-reports-edit', params: { id: item.data.id } })
}
</script>
