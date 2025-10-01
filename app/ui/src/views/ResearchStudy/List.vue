<template>
	<Header
		:list-state="listState"
		search
		title="ResearchStudies" />
	<Container>
		<ApiTable
			:list-state="listState"
			@row-click="openDetails">
			<Column
				field="title"
				header="Title" />
			<Column
				field="principal_investigator"
				header="Principal Investigator" />
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
import type { ResearchStudy } from '@/models/ResearchStudy/Model'
import { useResearchStudyListState } from '@/models/ResearchStudy/States'
import ApiTableRemoveButton from '@/components/Table/ApiTableRemoveButton.vue'
import { format } from 'date-fns'

const listState = useResearchStudyListState()
const router = useRouter()

onBeforeMount(() => {
	listState.getList()
})

function openDetails(item: { data: ResearchStudy }) {
	router.push({ name: 'research-studies-edit', params: { id: item.data.id } })
}
</script>
