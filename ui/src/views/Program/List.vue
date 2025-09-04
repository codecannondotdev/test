<template>
	<Header
		:list-state="listState"
		search
		title="Programs" />
	<Container>
		<ApiTable
			:list-state="listState"
			@row-click="openDetails">
			<Column
				field="name"
				header="Name" />
			<Column
				field="description"
				header="Description" />
			<Column
				field="duration_weeks"
				header="Duration Weeks" />
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
import type { Program } from '@/models/Program/Model'
import { useProgramListState } from '@/models/Program/States'
import ApiTableRemoveButton from '@/components/Table/ApiTableRemoveButton.vue'

const listState = useProgramListState()
const router = useRouter()

onBeforeMount(() => {
	listState.getList()
})

function openDetails(item: { data: Program }) {
	router.push({ name: 'programs-edit', params: { id: item.data.id } })
}
</script>
