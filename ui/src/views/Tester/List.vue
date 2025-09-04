<template>
	<Header
		:list-state="listState"
		search
		title="Testers" />
	<Container>
		<ApiTable
			:list-state="listState"
			@row-click="openDetails">
			<Column
				field="asdfasdfasd"
				header="Asdfasdfasd" />
			<Column
				field="asdffasdfasdfasdf"
				header="Asdffasdfasdfasdf" />
			<Column
				field="nice_names"
				header="Nice Names" />
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
import type { Tester } from '@/models/Tester/Model'
import { useTesterListState } from '@/models/Tester/States'
import ApiTableRemoveButton from '@/components/Table/ApiTableRemoveButton.vue'

const listState = useTesterListState()
const router = useRouter()

onBeforeMount(() => {
	listState.getList()
})

function openDetails(item: { data: Tester }) {
	router.push({ name: 'testers-edit', params: { id: item.data.id } })
}
</script>
