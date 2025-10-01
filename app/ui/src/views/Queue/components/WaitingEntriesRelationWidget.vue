<template>
	<Card class="waiting-entries-relation-widget">
		<template #title>
			<h4 class="waiting-entries-relation-widget__title">Waiting Entries</h4>
			<Button
				icon="fal fa-link"
				label="Connect"
				outlined
				severity="secondary"
				@click="isRelationAddDialogActive = true" />
			<Button
				icon="fal fa-plus"
				label="Create"
				outlined
				severity="secondary"
				@click="isFormActive = true" />
		</template>
		<template #content>
			<ApiTable
				flat
				:list-state="listState"
				@row-click="openDetails">
				<Column
					field="position"
					header="Position" />
				<Column
					header=""
					:style="{ maxWidth: '72px', width: '72px' }">
					<template #body="slotProps">
						<Button
							severity="secondary"
							outlined
							rounded
							icon="fal fa-times"
							:loading="dissociateLoading === slotProps.data.id"
							@click.stop.prevent="dissociate(slotProps.data)" />
					</template>
				</Column>
			</ApiTable>
		</template>
	</Card>
	<WaitingEntriesRelationAddDialog
		v-model="isRelationAddDialogActive"
		:queue-id="props.queueId"
		@update="refresh()" />
	<WaitingListForm
		:as-dialog="true"
		:visible="isFormActive"
		:should-redirect="false"
		:force-values="{ queue_id: Number(props.queueId) }"
		:hide-inputs="['queue_id']"
		@close="isFormActive = false"
		@created="refresh()" />
</template>

<script setup lang="ts">
import { defineProps, onBeforeMount, ref } from 'vue'
import WaitingEntriesRelationAddDialog from './WaitingEntriesRelationAddDialog.vue'
import WaitingListForm from '@/views/WaitingList/components/Form.vue'
import Card from 'primevue/card'
import ApiTable from '@/components/Table/ApiTable.vue'
import Column from 'primevue/column'
import Button from 'primevue/button'
import { useRouter } from 'vue-router'
import { useWaitingListListState } from '@/models/WaitingList/States'
import type { WaitingList } from '@/models/WaitingList/Model'
import type { Queue } from '@/models/Queue/Model'
import QueuesApi from '@/models/Queue/Api'

const emit = defineEmits(['start-loading', 'stop-loading'])

const props = defineProps<{
	queueId: Queue['id']
}>()

const router = useRouter()
const isRelationAddDialogActive = ref(false)
const isFormActive = ref(false)
const dissociateLoading = ref(null as null | number | string)
const listLoading = ref(false)
const listState = useWaitingListListState()
listState.defaultParams = {
	per_page: 10,
	fromRelation: {
		model: 'App\\Models\\Queue',
		id: props.queueId,
		relation: 'waitingEntries',
	},
}

onBeforeMount(() => {
	refresh()
})

async function refresh() {
	listLoading.value = true
	emit('start-loading')
	try {
		await listState.getList()
	} finally {
		listLoading.value = false
		emit('stop-loading')
	}
}

async function dissociate(item: WaitingList) {
	dissociateLoading.value = item.id
	emit('start-loading')
	try {
		await new QueuesApi().updateRelation(props.queueId, 'waitingEntries', {
			method: 'dissociate',
			params: [item.id],
		})
		dissociateLoading.value = null
		await refresh()
	} finally {
		dissociateLoading.value = null
		emit('stop-loading')
	}
}

function openDetails(item: { data: WaitingList }) {
	router.push({ name: 'waiting-lists-edit', params: { id: item.data.id } })
}
</script>

<style lang="scss" scoped>
.waiting-entries-relation-widget {
	width: 100%;
	max-width: 600px;
	overflow: hidden;

	:deep(.p-card-body) {
		padding: 20px 0 0;

		.p-card-caption {
			padding: 0px 20px 12px;

			.p-card-title {
				display: flex;
				align-items: center;
				gap: 10px;

				.waiting-entries-relation-widget__title {
					flex: 1;
					text-align: left;
				}
			}
		}
	}
}
</style>
