<template>
	<Header
		:list-state="listState"
		search
		title="BloodBanks" />
	<Container>
		<ApiTable
			:list-state="listState"
			@row-click="openDetails">
			<Column
				field="unit_number"
				header="Unit Number" />
			<Column
				field="blood_type"
				header="Blood Type" />
			<Column
				field="status"
				header="Status" />
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
import type { BloodBank } from '@/models/BloodBank/Model'
import { useBloodBankListState } from '@/models/BloodBank/States'
import ApiTableRemoveButton from '@/components/Table/ApiTableRemoveButton.vue'

const listState = useBloodBankListState()
const router = useRouter()

onBeforeMount(() => {
	listState.getList()
})

function openDetails(item: { data: BloodBank }) {
	router.push({ name: 'blood-banks-edit', params: { id: item.data.id } })
}
</script>
