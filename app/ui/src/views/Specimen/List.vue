<template>
	<Header
		:list-state="listState"
		search
		title="Specimens" />
	<Container>
		<ApiTable
			:list-state="listState"
			@row-click="openDetails">
			<Column
				field="label"
				header="Label" />
			<Column header="Collected At">
				<template #body="slotProps">
					{{ format(new Date(slotProps.data.collected_at), 'yyyy-MM-dd HH:mm') }}
				</template>
			</Column>
			<Column
				field="storage_location"
				header="Storage Location" />
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
import type { Specimen } from '@/models/Specimen/Model'
import { useSpecimenListState } from '@/models/Specimen/States'
import ApiTableRemoveButton from '@/components/Table/ApiTableRemoveButton.vue'
import { format } from 'date-fns'

const listState = useSpecimenListState()
const router = useRouter()

onBeforeMount(() => {
	listState.getList()
})

function openDetails(item: { data: Specimen }) {
	router.push({ name: 'specimens-edit', params: { id: item.data.id } })
}
</script>
