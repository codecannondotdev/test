<template>
	<Header
		:list-state="listState"
		search
		title="Suppliers" />
	<Container>
		<ApiTable
			:list-state="listState"
			@row-click="openDetails">
			<Column
				field="name"
				header="Name" />
			<Column
				field="contact_person"
				header="Contact Person" />
			<Column
				field="phone"
				header="Phone" />
			<Column
				field="email"
				header="Email" />
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
import type { Supplier } from '@/models/Supplier/Model'
import { useSupplierListState } from '@/models/Supplier/States'
import ApiTableRemoveButton from '@/components/Table/ApiTableRemoveButton.vue'

const listState = useSupplierListState()
const router = useRouter()

onBeforeMount(() => {
	listState.getList()
})

function openDetails(item: { data: Supplier }) {
	router.push({ name: 'suppliers-edit', params: { id: item.data.id } })
}
</script>
