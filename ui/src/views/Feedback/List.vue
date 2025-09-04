<template>
	<Header
		:list-state="listState"
		search
		title="Feedbacks" />
	<Container>
		<ApiTable
			:list-state="listState"
			@row-click="openDetails">
			<Column
				field="rating"
				header="Rating" />
			<Column
				field="comment"
				header="Comment" />
			<Column header="Feedback Date">
				<template #body="slotProps">
					{{ format(new Date(slotProps.data.feedback_date), 'yyyy-MM-dd') }}
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
import type { Feedback } from '@/models/Feedback/Model'
import { useFeedbackListState } from '@/models/Feedback/States'
import ApiTableRemoveButton from '@/components/Table/ApiTableRemoveButton.vue'
import { format } from 'date-fns'

const listState = useFeedbackListState()
const router = useRouter()

onBeforeMount(() => {
	listState.getList()
})

function openDetails(item: { data: Feedback }) {
	router.push({ name: 'feedbacks-edit', params: { id: item.data.id } })
}
</script>
