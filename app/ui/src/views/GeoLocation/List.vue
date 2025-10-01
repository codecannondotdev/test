<template>
	<Header
		:list-state="listState"
		search
		title="GeoLocations" />
	<Container>
		<ApiTable
			:list-state="listState"
			@row-click="openDetails">
			<Column
				field="latitude"
				header="Latitude" />
			<Column
				field="longitude"
				header="Longitude" />
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
import type { GeoLocation } from '@/models/GeoLocation/Model'
import { useGeoLocationListState } from '@/models/GeoLocation/States'
import ApiTableRemoveButton from '@/components/Table/ApiTableRemoveButton.vue'

const listState = useGeoLocationListState()
const router = useRouter()

onBeforeMount(() => {
	listState.getList()
})

function openDetails(item: { data: GeoLocation }) {
	router.push({ name: 'geo-locations-edit', params: { id: item.data.id } })
}
</script>
