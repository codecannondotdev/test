<template>
	<Header
		:list-state="listState"
		search
		title="Locations" />
	<Container>
		<ApiTable
			:list-state="listState"
			@row-click="openDetails">
			<Column
				field="aisle"
				header="Aisle" />
			<Column
				field="section"
				header="Section" />
			<Column
				field="shelf"
				header="Shelf" />
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
import type { Location } from '@/models/Location/Model'
import { useLocationListState } from '@/models/Location/States'
import ApiTableRemoveButton from '@/components/Table/ApiTableRemoveButton.vue'

const listState = useLocationListState()
const router = useRouter()

onBeforeMount(() => {
	listState.getList()
})

function openDetails(item: { data: Location }) {
	router.push({ name: 'locations-edit', params: { id: item.data.id } })
}
</script>
