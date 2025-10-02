<template>
	<Card class="returns-relation-widget">
		<template #title>
			<h4 class="returns-relation-widget__title">Returns</h4>
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
					field="reason"
					header="Reason" />
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
	<ReturnsRelationAddDialog
		v-model="isRelationAddDialogActive"
		:order-id="props.orderId"
		@update="refresh()" />
	<ReturnModelForm
		:as-dialog="true"
		:visible="isFormActive"
		:should-redirect="false"
		:force-values="{ order_id: Number(props.orderId) }"
		:hide-inputs="['order_id']"
		@close="isFormActive = false"
		@created="refresh()" />
</template>

<script setup lang="ts">
import { defineProps, onBeforeMount, ref } from 'vue'
import ReturnsRelationAddDialog from './ReturnsRelationAddDialog.vue'
import ReturnModelForm from '@/views/ReturnModel/components/Form.vue'
import Card from 'primevue/card'
import ApiTable from '@/components/Table/ApiTable.vue'
import Column from 'primevue/column'
import Button from 'primevue/button'
import { useRouter } from 'vue-router'
import { useReturnModelListState } from '@/models/ReturnModel/States'
import type { ReturnModel } from '@/models/ReturnModel/Model'
import type { Order } from '@/models/Order/Model'
import OrdersApi from '@/models/Order/Api'

const emit = defineEmits(['start-loading', 'stop-loading'])

const props = defineProps<{
	orderId: Order['id']
}>()

const router = useRouter()
const isRelationAddDialogActive = ref(false)
const isFormActive = ref(false)
const dissociateLoading = ref(null as null | number | string)
const listLoading = ref(false)
const listState = useReturnModelListState()
listState.defaultParams = {
	per_page: 10,
	fromRelation: {
		model: 'App\\Models\\Order',
		id: props.orderId,
		relation: 'returns',
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

async function dissociate(item: ReturnModel) {
	dissociateLoading.value = item.id
	emit('start-loading')
	try {
		await new OrdersApi().updateRelation(props.orderId, 'returns', {
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

function openDetails(item: { data: ReturnModel }) {
	router.push({ name: 'returns-edit', params: { id: item.data.id } })
}
</script>

<style lang="scss" scoped>
.returns-relation-widget {
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

				.returns-relation-widget__title {
					flex: 1;
					text-align: left;
				}
			}
		}
	}
}
</style>
