<template>
	<Header
		:list-state="listState"
		search
		title="PalliativeCarePlans" />
	<Container>
		<ApiTable
			:list-state="listState"
			@row-click="openDetails">
			<Column
				field="goals"
				header="Goals" />
			<Column
				field="medications"
				header="Medications" />
			<Column
				field="advance_directives"
				header="Advance Directives" />
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
import type { PalliativeCarePlan } from '@/models/PalliativeCarePlan/Model'
import { usePalliativeCarePlanListState } from '@/models/PalliativeCarePlan/States'
import ApiTableRemoveButton from '@/components/Table/ApiTableRemoveButton.vue'

const listState = usePalliativeCarePlanListState()
const router = useRouter()

onBeforeMount(() => {
	listState.getList()
})

function openDetails(item: { data: PalliativeCarePlan }) {
	router.push({ name: 'palliative-care-plans-edit', params: { id: item.data.id } })
}
</script>
