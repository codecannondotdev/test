<template>
	<Card class="beds-relation-widget">
		<template #title>
			<h4 class="beds-relation-widget__title">Beds</h4>
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
					field="bed_number"
					header="Bed Number" />
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
	<BedsRelationAddDialog
		v-model="isRelationAddDialogActive"
		:ward-id="props.wardId"
		@update="refresh()" />
	<BedForm
		:as-dialog="true"
		:visible="isFormActive"
		:should-redirect="false"
		:force-values="{ ward_id: Number(props.wardId) }"
		:hide-inputs="['ward_id']"
		@close="isFormActive = false"
		@created="refresh()" />
</template>

<script setup lang="ts">
import { defineProps, onBeforeMount, ref } from 'vue'
import BedsRelationAddDialog from './BedsRelationAddDialog.vue'
import BedForm from '@/views/Bed/components/Form.vue'
import Card from 'primevue/card'
import ApiTable from '@/components/Table/ApiTable.vue'
import Column from 'primevue/column'
import Button from 'primevue/button'
import { useRouter } from 'vue-router'
import { useBedListState } from '@/models/Bed/States'
import type { Bed } from '@/models/Bed/Model'
import type { Ward } from '@/models/Ward/Model'
import WardsApi from '@/models/Ward/Api'

const emit = defineEmits(['start-loading', 'stop-loading'])

const props = defineProps<{
	wardId: Ward['id']
}>()

const router = useRouter()
const isRelationAddDialogActive = ref(false)
const isFormActive = ref(false)
const dissociateLoading = ref(null as null | number | string)
const listLoading = ref(false)
const listState = useBedListState()
listState.defaultParams = {
	per_page: 10,
	fromRelation: {
		model: 'App\\Models\\Ward',
		id: props.wardId,
		relation: 'beds',
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

async function dissociate(item: Bed) {
	dissociateLoading.value = item.id
	emit('start-loading')
	try {
		await new WardsApi().updateRelation(props.wardId, 'beds', {
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

function openDetails(item: { data: Bed }) {
	router.push({ name: 'beds-edit', params: { id: item.data.id } })
}
</script>

<style lang="scss" scoped>
.beds-relation-widget {
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

				.beds-relation-widget__title {
					flex: 1;
					text-align: left;
				}
			}
		}
	}
}
</style>
