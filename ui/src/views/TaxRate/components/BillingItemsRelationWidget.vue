<template>
	<Card class="billing-items-relation-widget">
		<template #title>
			<h4 class="billing-items-relation-widget__title">Billing Items</h4>
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
	<BillingItemsRelationAddDialog
		v-model="isRelationAddDialogActive"
		:tax-rate-id="props.taxRateId"
		@update="refresh()" />
	<BillingItemForm
		:as-dialog="true"
		:visible="isFormActive"
		:should-redirect="false"
		:force-values="{ tax_rate_id: Number(props.taxRateId) }"
		:hide-inputs="['tax_rate_id']"
		@close="isFormActive = false"
		@created="refresh()" />
</template>

<script setup lang="ts">
import { defineProps, onBeforeMount, ref } from 'vue'
import BillingItemsRelationAddDialog from './BillingItemsRelationAddDialog.vue'
import BillingItemForm from '@/views/BillingItem/components/Form.vue'
import Card from 'primevue/card'
import ApiTable from '@/components/Table/ApiTable.vue'
import Column from 'primevue/column'
import Button from 'primevue/button'
import { useRouter } from 'vue-router'
import { useBillingItemListState } from '@/models/BillingItem/States'
import type { BillingItem } from '@/models/BillingItem/Model'
import type { TaxRate } from '@/models/TaxRate/Model'
import TaxRatesApi from '@/models/TaxRate/Api'

const emit = defineEmits(['start-loading', 'stop-loading'])

const props = defineProps<{
	taxRateId: TaxRate['id']
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
		model: 'App\\Models\\TaxRate',
		id: props.taxRateId,
		relation: 'billingItems',
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
		await new TaxRatesApi().updateRelation(props.taxRateId, 'billingItems', {
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
.billing-items-relation-widget {
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

				.billing-items-relation-widget__title {
					flex: 1;
					text-align: left;
				}
			}
		}
	}
}
</style>
