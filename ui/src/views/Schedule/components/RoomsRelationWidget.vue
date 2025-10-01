<template>
	<Card class="rooms-relation-widget">
		<template #title>
			<h4 class="rooms-relation-widget__title">Rooms</h4>
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
					field="room_number"
					header="Room Number" />
				<Column
					header=""
					:style="{ maxWidth: '72px', width: '72px' }">
					<template #body="slotProps">
						<Button
							severity="secondary"
							outlined
							rounded
							icon="fal fa-times"
							:loading="detachLoading === slotProps.data.id"
							@click.stop.prevent="detach(slotProps.data)" />
					</template>
				</Column>
			</ApiTable>
		</template>
	</Card>
	<RoomsRelationAddDialog
		v-model="isRelationAddDialogActive"
		:schedule-id="props.scheduleId"
		@update="refresh()" />
	<RoomForm
		:as-dialog="true"
		:visible="isFormActive"
		:should-redirect="false"
		:attach-to="{ schedules: { method: 'syncWithoutDetaching', id: props.scheduleId } }"
		@close="isFormActive = false"
		@created="refresh()" />
</template>

<script setup lang="ts">
import { defineProps, onBeforeMount, ref } from 'vue'
import RoomsRelationAddDialog from './RoomsRelationAddDialog.vue'
import RoomForm from '@/views/Room/components/Form.vue'
import Card from 'primevue/card'
import ApiTable from '@/components/Table/ApiTable.vue'
import Column from 'primevue/column'
import Button from 'primevue/button'
import { useRouter } from 'vue-router'
import { useRoomListState } from '@/models/Room/States'
import type { Room } from '@/models/Room/Model'
import type { Schedule } from '@/models/Schedule/Model'
import SchedulesApi from '@/models/Schedule/Api'

const emit = defineEmits(['start-loading', 'stop-loading'])

const props = defineProps<{
	scheduleId: Schedule['id']
}>()

const router = useRouter()
const isRelationAddDialogActive = ref(false)
const isFormActive = ref(false)
const detachLoading = ref(null as null | number | string)
const listLoading = ref(false)
const listState = useRoomListState()
listState.defaultParams = {
	per_page: 10,
	fromRelation: {
		model: 'App\\Models\\Schedule',
		id: props.scheduleId,
		relation: 'rooms',
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

async function detach(item: Room) {
	detachLoading.value = item.id
	emit('start-loading')
	try {
		await new SchedulesApi().updateRelation(props.scheduleId, 'rooms', {
			method: 'detach',
			params: [item.id],
		})
		detachLoading.value = null
		await refresh()
	} finally {
		detachLoading.value = null
		emit('stop-loading')
	}
}

function openDetails(item: { data: Room }) {
	router.push({ name: 'rooms-edit', params: { id: item.data.id } })
}
</script>

<style lang="scss" scoped>
.rooms-relation-widget {
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

				.rooms-relation-widget__title {
					flex: 1;
					text-align: left;
				}
			}
		}
	}
}
</style>
