<template>
	<Header
		:list-state="listState"
		search
		title="Transfusions" />
	<Container>
		<ApiTable
			:list-state="listState"
			@row-click="openDetails">
			<Column header="Transfusion Date">
				<template #body="slotProps">
					{{ format(new Date(slotProps.data.transfusion_date), 'yyyy-MM-dd HH:mm') }}
				</template>
			</Column>
			<Column
				field="volume"
				header="Volume" />
			<Column
				field="reaction_observed"
				header="Reaction Observed" />
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
import type { Transfusion } from '@/models/Transfusion/Model'
import { useTransfusionListState } from '@/models/Transfusion/States'
import ApiTableRemoveButton from '@/components/Table/ApiTableRemoveButton.vue'
import { format } from 'date-fns'

const listState = useTransfusionListState()
const router = useRouter()

onBeforeMount(() => {
	listState.getList()
})

function openDetails(item: { data: Transfusion }) {
	router.push({ name: 'transfusions-edit', params: { id: item.data.id } })
}
</script>
