<template>
	<Header
		:list-state="listState"
		search
		title="Rooms" />
	<Container>
		<ApiTable
			:list-state="listState"
			@row-click="openDetails">
			<Column
				field="room_number"
				header="Room Number" />
			<Column
				field="type"
				header="Type" />
			<Column
				field="capacity"
				header="Capacity" />
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
import type { Room } from '@/models/Room/Model'
import { useRoomListState } from '@/models/Room/States'
import ApiTableRemoveButton from '@/components/Table/ApiTableRemoveButton.vue'

const listState = useRoomListState()
const router = useRouter()

onBeforeMount(() => {
	listState.getList()
})

function openDetails(item: { data: Room }) {
	router.push({ name: 'rooms-edit', params: { id: item.data.id } })
}
</script>
