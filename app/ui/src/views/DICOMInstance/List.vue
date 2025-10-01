<template>
	<Header
		:list-state="listState"
		search
		title="DICOMInstances" />
	<Container>
		<ApiTable
			:list-state="listState"
			@row-click="openDetails">
			<Column
				field="uid"
				header="Uid" />
			<Column
				field="sop_class"
				header="Sop Class" />
			<Column header="Stored At">
				<template #body="slotProps">
					{{ format(new Date(slotProps.data.stored_at), 'yyyy-MM-dd HH:mm') }}
				</template>
			</Column>
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
import type { DICOMInstance } from '@/models/DICOMInstance/Model'
import { useDICOMInstanceListState } from '@/models/DICOMInstance/States'
import ApiTableRemoveButton from '@/components/Table/ApiTableRemoveButton.vue'
import { format } from 'date-fns'

const listState = useDICOMInstanceListState()
const router = useRouter()

onBeforeMount(() => {
	listState.getList()
})

function openDetails(item: { data: DICOMInstance }) {
	router.push({ name: 'dicom-instances-edit', params: { id: item.data.id } })
}
</script>
