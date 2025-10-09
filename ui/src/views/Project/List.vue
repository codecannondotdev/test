<template>
	<Header
		:list-state="listState"
		search
		title="Projects" />
	<Container>
		<ApiTable
			:list-state="listState"
			@row-click="openDetails">
			<Column
				field="name"
				header="Name" />
			<Column
				field="code"
				header="Code" />
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
import type { Project } from '@/models/Project/Model'
import { useProjectListState } from '@/models/Project/States'
import ApiTableRemoveButton from '@/components/Table/ApiTableRemoveButton.vue'
import { format } from 'date-fns'

const listState = useProjectListState()
const router = useRouter()

onBeforeMount(() => {
	listState.getList()
})

function openDetails(item: { data: Project }) {
	router.push({ name: 'projects-edit', params: { id: item.data.id } })
}
</script>
