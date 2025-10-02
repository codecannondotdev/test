<template>
	<Header
		:list-state="listState"
		search
		title="Kartas" />
	<Container>
		<ApiTable
			:list-state="listState"
			@row-click="openDetails">
			<Column
				field="ime"
				header="Ime" />
			<Column
				field="oceno"
				header="Oceno" />
			<Column
				field="edition"
				header="Edition" />
			<Column
				field="card_number"
				header="Card Number" />
			<Column
				field="condition"
				header="Condition" />
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
import type { Karta } from '@/models/Karta/Model'
import { useKartaListState } from '@/models/Karta/States'
import ApiTableRemoveButton from '@/components/Table/ApiTableRemoveButton.vue'

const listState = useKartaListState()
const router = useRouter()

onBeforeMount(() => {
	listState.getList()
})

function openDetails(item: { data: Karta }) {
	router.push({ name: 'kartas-edit', params: { id: item.data.id } })
}
</script>
