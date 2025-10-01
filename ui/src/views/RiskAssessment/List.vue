<template>
	<Header
		:list-state="listState"
		search
		title="RiskAssessments" />
	<Container>
		<ApiTable
			:list-state="listState"
			@row-click="openDetails">
			<Column
				field="tool_name"
				header="Tool Name" />
			<Column
				field="score"
				header="Score" />
			<Column header="Assessment Date">
				<template #body="slotProps">
					{{ format(new Date(slotProps.data.assessment_date), 'yyyy-MM-dd') }}
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
import type { RiskAssessment } from '@/models/RiskAssessment/Model'
import { useRiskAssessmentListState } from '@/models/RiskAssessment/States'
import ApiTableRemoveButton from '@/components/Table/ApiTableRemoveButton.vue'
import { format } from 'date-fns'

const listState = useRiskAssessmentListState()
const router = useRouter()

onBeforeMount(() => {
	listState.getList()
})

function openDetails(item: { data: RiskAssessment }) {
	router.push({ name: 'risk-assessments-edit', params: { id: item.data.id } })
}
</script>
