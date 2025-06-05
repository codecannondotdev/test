<template>
	<Header
		:list-state="listState"
		search
		title="Materials" />
	<Container>
		<ApiTable
			:list-state="listState"
			@row-click="openDetails">
			<Column
				field="name"
				header="Name" />
			<Column
				field="unit"
				header="Unit" />
			<Column
				field="grade"
				header="Grade" />
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
import type { Material } from '@/models/Material/Model'
import { useMaterialListState } from '@/models/Material/States'
import ApiTableRemoveButton from '@/components/Table/ApiTableRemoveButton.vue'

const listState = useMaterialListState()
const router = useRouter()

onBeforeMount(() => {
	listState.getList()
})

function openDetails(item: { data: Material }) {
	router.push({ name: 'materials-edit', params: { id: item.data.id } })
}
</script>
