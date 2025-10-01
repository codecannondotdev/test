<template>
	<Header
		:list-state="listState"
		search
		title="Anesthesia" />
	<Container>
		<ApiTable
			:list-state="listState"
			@row-click="openDetails">
			<Column
				field="type"
				header="Type" />
			<Column header="Start Time">
				<template #body="slotProps">
					{{ format(new Date(slotProps.data.start_time), 'yyyy-MM-dd HH:mm') }}
				</template>
			</Column>
			<Column header="End Time">
				<template #body="slotProps">
					{{ format(new Date(slotProps.data.end_time), 'yyyy-MM-dd HH:mm') }}
				</template>
			</Column>
			<Column
				field="complications"
				header="Complications" />
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
import type { Anesthesia } from '@/models/Anesthesia/Model'
import { useAnesthesiaListState } from '@/models/Anesthesia/States'
import ApiTableRemoveButton from '@/components/Table/ApiTableRemoveButton.vue'
import { format } from 'date-fns'

const listState = useAnesthesiaListState()
const router = useRouter()

onBeforeMount(() => {
	listState.getList()
})

function openDetails(item: { data: Anesthesia }) {
	router.push({ name: 'anesthesia-edit', params: { id: item.data.id } })
}
</script>
