<template>
	<Card class="attendees-relation-widget">
		<template #title>
			<h4 class="attendees-relation-widget__title">Attendees</h4>
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
					field="first_name"
					header="First Name" />
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
	<AttendeesRelationAddDialog
		v-model="isRelationAddDialogActive"
		:fitness-class-id="props.fitnessClassId"
		@update="refresh()" />
	<AsdfasdfasdForm
		:as-dialog="true"
		:visible="isFormActive"
		:should-redirect="false"
		:attach-to="{ attendedClasses: { method: 'syncWithoutDetaching', id: props.fitnessClassId } }"
		@close="isFormActive = false"
		@created="refresh()" />
</template>

<script setup lang="ts">
import { defineProps, onBeforeMount, ref } from 'vue'
import AttendeesRelationAddDialog from './AttendeesRelationAddDialog.vue'
import AsdfasdfasdForm from '@/views/Asdfasdfasd/components/Form.vue'
import Card from 'primevue/card'
import ApiTable from '@/components/Table/ApiTable.vue'
import Column from 'primevue/column'
import Button from 'primevue/button'
import { useRouter } from 'vue-router'
import { useAsdfasdfasdListState } from '@/models/Asdfasdfasd/States'
import type { Asdfasdfasd } from '@/models/Asdfasdfasd/Model'
import type { FitnessClass } from '@/models/FitnessClass/Model'
import FitnessClasssApi from '@/models/FitnessClass/Api'

const emit = defineEmits(['start-loading', 'stop-loading'])

const props = defineProps<{
	fitnessClassId: FitnessClass['id']
}>()

const router = useRouter()
const isRelationAddDialogActive = ref(false)
const isFormActive = ref(false)
const detachLoading = ref(null as null | number | string)
const listLoading = ref(false)
const listState = useAsdfasdfasdListState()
listState.defaultParams = {
	per_page: 10,
	fromRelation: {
		model: 'App\\Models\\FitnessClass',
		id: props.fitnessClassId,
		relation: 'attendees',
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

async function detach(item: Asdfasdfasd) {
	detachLoading.value = item.id
	emit('start-loading')
	try {
		await new FitnessClasssApi().updateRelation(props.fitnessClassId, 'attendees', {
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

function openDetails(item: { data: Asdfasdfasd }) {
	router.push({ name: 'asdfasdfasds-edit', params: { id: item.data.id } })
}
</script>

<style lang="scss" scoped>
.attendees-relation-widget {
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

				.attendees-relation-widget__title {
					flex: 1;
					text-align: left;
				}
			}
		}
	}
}
</style>
