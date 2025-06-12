<template>
	<Card class="bookings-relation-widget">
		<template #title>
			<h4 class="bookings-relation-widget__title">Bookings</h4>
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
				<Column header="Booking Date">
					<template #body="slotProps">
						{{ format(new Date(slotProps.data.booking_date), 'yyyy-MM-dd') }}
					</template>
				</Column>
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
	<BookingsRelationAddDialog
		v-model="isRelationAddDialogActive"
		:session-id="props.sessionId"
		@update="refresh()" />
	<BookingForm
		:as-dialog="true"
		:visible="isFormActive"
		:should-redirect="false"
		:force-values="{ session_id: Number(props.sessionId) }"
		:hide-inputs="['session_id']"
		@close="isFormActive = false"
		@created="refresh()" />
</template>

<script setup lang="ts">
import { defineProps, onBeforeMount, ref } from 'vue'
import BookingsRelationAddDialog from './BookingsRelationAddDialog.vue'
import BookingForm from '@/views/Booking/components/Form.vue'
import Card from 'primevue/card'
import ApiTable from '@/components/Table/ApiTable.vue'
import Column from 'primevue/column'
import Button from 'primevue/button'
import { useRouter } from 'vue-router'
import { useBookingListState } from '@/models/Booking/States'
import type { Booking } from '@/models/Booking/Model'
import type { Session } from '@/models/Session/Model'
import SessionsApi from '@/models/Session/Api'
import { format } from 'date-fns'

const emit = defineEmits(['start-loading', 'stop-loading'])

const props = defineProps<{
	sessionId: Session['id']
}>()

const router = useRouter()
const isRelationAddDialogActive = ref(false)
const isFormActive = ref(false)
const dissociateLoading = ref(null as null | number | string)
const listLoading = ref(false)
const listState = useBookingListState()
listState.defaultParams = {
	per_page: 10,
	fromRelation: {
		model: 'App\\Models\\Session',
		id: props.sessionId,
		relation: 'bookings',
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

async function dissociate(item: Booking) {
	dissociateLoading.value = item.id
	emit('start-loading')
	try {
		await new SessionsApi().updateRelation(props.sessionId, 'bookings', {
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

function openDetails(item: { data: Booking }) {
	router.push({ name: 'bookings-edit', params: { id: item.data.id } })
}
</script>

<style lang="scss" scoped>
.bookings-relation-widget {
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

				.bookings-relation-widget__title {
					flex: 1;
					text-align: left;
				}
			}
		}
	}
}
</style>
