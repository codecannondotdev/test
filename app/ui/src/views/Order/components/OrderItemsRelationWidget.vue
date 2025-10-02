<template>
	<Card class="order-items-relation-widget">
		<template #title>
			<h4 class="order-items-relation-widget__title">Order Items</h4>
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
					field="item_name"
					header="Item Name" />
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
	<OrderItemsRelationAddDialog
		v-model="isRelationAddDialogActive"
		:order-id="props.orderId"
		@update="refresh()" />
	<OrderItemForm
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
import OrderItemsRelationAddDialog from './OrderItemsRelationAddDialog.vue'
import OrderItemForm from '@/views/OrderItem/components/Form.vue'
import Card from 'primevue/card'
import ApiTable from '@/components/Table/ApiTable.vue'
import Column from 'primevue/column'
import Button from 'primevue/button'
import { useRouter } from 'vue-router'
import { useOrderItemListState } from '@/models/OrderItem/States'
import type { OrderItem } from '@/models/OrderItem/Model'
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
const listState = useOrderItemListState()
listState.defaultParams = {
	per_page: 10,
	fromRelation: {
		model: 'App\\Models\\Order',
		id: props.orderId,
		relation: 'orderItems',
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

async function dissociate(item: OrderItem) {
	dissociateLoading.value = item.id
	emit('start-loading')
	try {
		await new OrdersApi().updateRelation(props.orderId, 'orderItems', {
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

function openDetails(item: { data: OrderItem }) {
	router.push({ name: 'order-items-edit', params: { id: item.data.id } })
}
</script>

<style lang="scss" scoped>
.order-items-relation-widget {
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

				.order-items-relation-widget__title {
					flex: 1;
					text-align: left;
				}
			}
		}
	}
}
</style>
