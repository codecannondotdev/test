<template>
	<Header
		:list-state="listState"
		search
		title="PathologyReports" />
	<Container>
		<ApiTable
			:list-state="listState"
			@row-click="openDetails">
			<Column
				field="specimen_description"
				header="Specimen Description" />
			<Column
				field="findings"
				header="Findings" />
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
import type { PathologyReport } from '@/models/PathologyReport/Model'
import { usePathologyReportListState } from '@/models/PathologyReport/States'
import ApiTableRemoveButton from '@/components/Table/ApiTableRemoveButton.vue'
import { format } from 'date-fns'

const listState = usePathologyReportListState()
const router = useRouter()

onBeforeMount(() => {
	listState.getList()
})

function openDetails(item: { data: PathologyReport }) {
	router.push({ name: 'pathology-reports-edit', params: { id: item.data.id } })
}
</script>
