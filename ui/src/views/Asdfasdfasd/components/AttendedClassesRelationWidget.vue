<template>
	<Card class="attended-classes-relation-widget">
		<template #title>
			<h4 class="attended-classes-relation-widget__title">Attended Classes</h4>
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
					field="name"
					header="Name" />
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
	<AttendedClassesRelationAddDialog
		v-model="isRelationAddDialogActive"
		:asdfasdfasd-id="props.asdfasdfasdId"
		@update="refresh()" />
	<FitnessClassForm
		:as-dialog="true"
		:visible="isFormActive"
		:should-redirect="false"
		:attach-to="{ attendees: { method: 'syncWithoutDetaching', id: props.asdfasdfasdId } }"
		@close="isFormActive = false"
		@created="refresh()" />
</template>

<script setup lang="ts">
import { defineProps, onBeforeMount, ref } from 'vue'
import AttendedClassesRelationAddDialog from './AttendedClassesRelationAddDialog.vue'
import FitnessClassForm from '@/views/FitnessClass/components/Form.vue'
import Card from 'primevue/card'
import ApiTable from '@/components/Table/ApiTable.vue'
import Column from 'primevue/column'
import Button from 'primevue/button'
import { useRouter } from 'vue-router'
import { useFitnessClassListState } from '@/models/FitnessClass/States'
import type { FitnessClass } from '@/models/FitnessClass/Model'
import type { Asdfasdfasd } from '@/models/Asdfasdfasd/Model'
import AsdfasdfasdsApi from '@/models/Asdfasdfasd/Api'

const emit = defineEmits(['start-loading', 'stop-loading'])

const props = defineProps<{
	asdfasdfasdId: Asdfasdfasd['id']
}>()

const router = useRouter()
const isRelationAddDialogActive = ref(false)
const isFormActive = ref(false)
const detachLoading = ref(null as null | number | string)
const listLoading = ref(false)
const listState = useFitnessClassListState()
listState.defaultParams = {
	per_page: 10,
	fromRelation: {
		model: 'App\\Models\\Asdfasdfasd',
		id: props.asdfasdfasdId,
		relation: 'attendedClasses',
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

async function detach(item: FitnessClass) {
	detachLoading.value = item.id
	emit('start-loading')
	try {
		await new AsdfasdfasdsApi().updateRelation(props.asdfasdfasdId, 'attendedClasses', {
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

function openDetails(item: { data: FitnessClass }) {
	router.push({ name: 'fitness-classs-edit', params: { id: item.data.id } })
}
</script>

<style lang="scss" scoped>
.attended-classes-relation-widget {
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

				.attended-classes-relation-widget__title {
					flex: 1;
					text-align: left;
				}
			}
		}
	}
}
</style>
