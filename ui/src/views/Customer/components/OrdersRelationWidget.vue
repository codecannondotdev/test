<template>
	<Card class="orders-relation-widget">
		<template #title>
			<h4 class="orders-relation-widget__title">Orders</h4>
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
					field="status"
					header="Status" />
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
	<OrdersRelationAddDialog
		v-model="isRelationAddDialogActive"
		:customer-id="props.customerId"
		@update="refresh()" />
	<OrderForm
		:as-dialog="true"
		:visible="isFormActive"
		:should-redirect="false"
		:force-values="{ customer_id: Number(props.customerId) }"
		:hide-inputs="['customer_id']"
		@close="isFormActive = false"
		@created="refresh()" />
</template>

<script setup lang="ts">
import { defineProps, onBeforeMount, ref } from 'vue'
import OrdersRelationAddDialog from './OrdersRelationAddDialog.vue'
import OrderForm from '@/views/Order/components/Form.vue'
import Card from 'primevue/card'
import ApiTable from '@/components/Table/ApiTable.vue'
import Column from 'primevue/column'
import Button from 'primevue/button'
import { useRouter } from 'vue-router'
import { useOrderListState } from '@/models/Order/States'
import type { Order } from '@/models/Order/Model'
import type { Customer } from '@/models/Customer/Model'
import CustomersApi from '@/models/Customer/Api'

const emit = defineEmits(['start-loading', 'stop-loading'])

const props = defineProps<{
	customerId: Customer['id']
}>()

const router = useRouter()
const isRelationAddDialogActive = ref(false)
const isFormActive = ref(false)
const dissociateLoading = ref(null as null | number | string)
const listLoading = ref(false)
const listState = useOrderListState()
listState.defaultParams = {
	per_page: 10,
	fromRelation: {
		model: 'App\\Models\\Customer',
		id: props.customerId,
		relation: 'orders',
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

async function dissociate(item: Order) {
	dissociateLoading.value = item.id
	emit('start-loading')
	try {
		await new CustomersApi().updateRelation(props.customerId, 'orders', {
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

function openDetails(item: { data: Order }) {
	router.push({ name: 'orders-edit', params: { id: item.data.id } })
}
</script>

<style lang="scss" scoped>
.orders-relation-widget {
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

				.orders-relation-widget__title {
					flex: 1;
					text-align: left;
				}
			}
		}
	}
}
</style>
