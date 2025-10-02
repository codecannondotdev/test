<template>
	<Header
		:list-state="listState"
		search
		title="Products" />
	<Container>
		<ApiTable
			:list-state="listState"
			@row-click="openDetails">
			<Column
				field="name"
				header="Name" />
			<Column
				field="weight"
				header="Weight" />
			<Column
				field="price"
				header="Price" />
			<Column
				field="description"
				header="Description" />
			<Column
				field="dimensions"
				header="Dimensions" />
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
import type { Product } from '@/models/Product/Model'
import { useProductListState } from '@/models/Product/States'
import ApiTableRemoveButton from '@/components/Table/ApiTableRemoveButton.vue'

const listState = useProductListState()
const router = useRouter()

onBeforeMount(() => {
	listState.getList()
})

function openDetails(item: { data: Product }) {
	router.push({ name: 'products-edit', params: { id: item.data.id } })
}
</script>
