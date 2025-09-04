<template>
	<Header
		:list-state="listState"
		search
		title="Schedules" />
	<Container>
		<ApiTable
			:list-state="listState"
			@row-click="openDetails">
			<Column
				field="day"
				header="Day" />
			<Column
				field="start_time"
				header="Start Time" />
			<Column
				field="end_time"
				header="End Time" />
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
import type { Schedule } from '@/models/Schedule/Model'
import { useScheduleListState } from '@/models/Schedule/States'
import ApiTableRemoveButton from '@/components/Table/ApiTableRemoveButton.vue'

const listState = useScheduleListState()
const router = useRouter()

onBeforeMount(() => {
	listState.getList()
})

function openDetails(item: { data: Schedule }) {
	router.push({ name: 'schedules-edit', params: { id: item.data.id } })
}
</script>
