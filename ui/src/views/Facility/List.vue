<template>
	<Header
		:list-state="listState"
		search
		title="Facilities" />
	<Container>
		<ApiTable
			:list-state="listState"
			@row-click="openDetails">
			<Column
				field="name"
				header="Name" />
			<Column
				field="address"
				header="Address" />
			<Column
				field="description"
				header="Description" />
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
import type { Facility } from '@/models/Facility/Model'
import { useFacilityListState } from '@/models/Facility/States'
import ApiTableRemoveButton from '@/components/Table/ApiTableRemoveButton.vue'

const listState = useFacilityListState()
const router = useRouter()

onBeforeMount(() => {
	listState.getList()
})

function openDetails(item: { data: Facility }) {
	router.push({ name: 'facilities-edit', params: { id: item.data.id } })
}
</script>
