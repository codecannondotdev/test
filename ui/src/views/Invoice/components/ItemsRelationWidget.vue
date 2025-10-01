<template>
	<Card class="items-relation-widget">
		<template #title>
			<h4 class="items-relation-widget__title">Items</h4>
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
					field="description"
					header="Description" />
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
	<ItemsRelationAddDialog
		v-model="isRelationAddDialogActive"
		:invoice-id="props.invoiceId"
		@update="refresh()" />
	<BillingItemForm
		:as-dialog="true"
		:visible="isFormActive"
		:should-redirect="false"
		:force-values="{ invoice_id: Number(props.invoiceId) }"
		:hide-inputs="['invoice_id']"
		@close="isFormActive = false"
		@created="refresh()" />
</template>

<script setup lang="ts">
import { defineProps, onBeforeMount, ref } from 'vue'
import ItemsRelationAddDialog from './ItemsRelationAddDialog.vue'
import BillingItemForm from '@/views/BillingItem/components/Form.vue'
import Card from 'primevue/card'
import ApiTable from '@/components/Table/ApiTable.vue'
import Column from 'primevue/column'
import Button from 'primevue/button'
import { useRouter } from 'vue-router'
import { useBillingItemListState } from '@/models/BillingItem/States'
import type { BillingItem } from '@/models/BillingItem/Model'
import type { Invoice } from '@/models/Invoice/Model'
import InvoicesApi from '@/models/Invoice/Api'

const emit = defineEmits(['start-loading', 'stop-loading'])

const props = defineProps<{
	invoiceId: Invoice['id']
}>()

const router = useRouter()
const isRelationAddDialogActive = ref(false)
const isFormActive = ref(false)
const dissociateLoading = ref(null as null | number | string)
const listLoading = ref(false)
const listState = useBillingItemListState()
listState.defaultParams = {
	per_page: 10,
	fromRelation: {
		model: 'App\\Models\\Invoice',
		id: props.invoiceId,
		relation: 'items',
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

async function dissociate(item: BillingItem) {
	dissociateLoading.value = item.id
	emit('start-loading')
	try {
		await new InvoicesApi().updateRelation(props.invoiceId, 'items', {
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

function openDetails(item: { data: BillingItem }) {
	router.push({ name: 'billing-items-edit', params: { id: item.data.id } })
}
</script>

<style lang="scss" scoped>
.items-relation-widget {
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

				.items-relation-widget__title {
					flex: 1;
					text-align: left;
				}
			}
		}
	}
}
</style>
