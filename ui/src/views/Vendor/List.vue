<template>
	<Header
		:list-state="listState"
		search
		title="Vendors" />
	<Container>
		<ApiTable
			:list-state="listState"
			@row-click="openDetails">
			<Column
				field="name"
				header="Name" />
			<Column
				field="contact_info"
				header="Contact Info" />
			<Column
				field="address"
				header="Address" />
			<Column
				field="default_payment_terms"
				header="Default Payment Terms" />
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
import type { Vendor } from '@/models/Vendor/Model'
import { useVendorListState } from '@/models/Vendor/States'
import ApiTableRemoveButton from '@/components/Table/ApiTableRemoveButton.vue'

const listState = useVendorListState()
const router = useRouter()

onBeforeMount(() => {
	listState.getList()
})

function openDetails(item: { data: Vendor }) {
	router.push({ name: 'vendors-edit', params: { id: item.data.id } })
}
</script>
