<template>
	<Header
		:list-state="listState"
		search
		title="NutritionalPlans" />
	<Container>
		<ApiTable
			:list-state="listState"
			@row-click="openDetails">
			<Column
				field="diet_type"
				header="Diet Type" />
			<Column
				field="calorie_goal"
				header="Calorie Goal" />
			<Column
				field="notes"
				header="Notes" />
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
import type { NutritionalPlan } from '@/models/NutritionalPlan/Model'
import { useNutritionalPlanListState } from '@/models/NutritionalPlan/States'
import ApiTableRemoveButton from '@/components/Table/ApiTableRemoveButton.vue'

const listState = useNutritionalPlanListState()
const router = useRouter()

onBeforeMount(() => {
	listState.getList()
})

function openDetails(item: { data: NutritionalPlan }) {
	router.push({ name: 'nutritional-plans-edit', params: { id: item.data.id } })
}
</script>
