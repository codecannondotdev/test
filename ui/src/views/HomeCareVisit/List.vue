<template>
	<Header
		:list-state="listState"
		search
		title="HomeCareVisits" />
	<Container>
		<ApiTable
			:list-state="listState"
			@row-click="openDetails">
			<Column header="Visit Date">
				<template #body="slotProps">
					{{ format(new Date(slotProps.data.visit_date), 'yyyy-MM-dd') }}
				</template>
			</Column>
			<Column
				field="services_provided"
				header="Services Provided" />
			<Column
				field="distance_travelled"
				header="Distance Travelled" />
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
import type { HomeCareVisit } from '@/models/HomeCareVisit/Model'
import { useHomeCareVisitListState } from '@/models/HomeCareVisit/States'
import ApiTableRemoveButton from '@/components/Table/ApiTableRemoveButton.vue'
import { format } from 'date-fns'

const listState = useHomeCareVisitListState()
const router = useRouter()

onBeforeMount(() => {
	listState.getList()
})

function openDetails(item: { data: HomeCareVisit }) {
	router.push({ name: 'home-care-visits-edit', params: { id: item.data.id } })
}
</script>
