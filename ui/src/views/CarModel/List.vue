<template>
	<Header
		:list-state="listState"
		search
		title="CarModels" />
	<Container>
		<ApiTable
			:list-state="listState"
			@row-click="openDetails">
			<Column
				field="model_name"
				header="Model Name" />
			<Column
				field="engine_type"
				header="Engine Type" />
			<Column
				field="features"
				header="Features" />
			<Column
				field="base_price"
				header="Base Price" />
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
import type { CarModel } from '@/models/CarModel/Model'
import { useCarModelListState } from '@/models/CarModel/States'
import ApiTableRemoveButton from '@/components/Table/ApiTableRemoveButton.vue'

const listState = useCarModelListState()
const router = useRouter()

onBeforeMount(() => {
	listState.getList()
})

function openDetails(item: { data: CarModel }) {
	router.push({ name: 'car-models-edit', params: { id: item.data.id } })
}
</script>
