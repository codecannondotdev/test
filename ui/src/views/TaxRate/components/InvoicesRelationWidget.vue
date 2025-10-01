<template>
	<Card class="invoices-relation-widget">
		<template #title>
			<h4 class="invoices-relation-widget__title">Invoices</h4>
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
					field="invoice_number"
					header="Invoice Number" />
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
	<InvoicesRelationAddDialog
		v-model="isRelationAddDialogActive"
		:tax-rate-id="props.taxRateId"
		@update="refresh()" />
	<InvoiceForm
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
import InvoicesRelationAddDialog from './InvoicesRelationAddDialog.vue'
import InvoiceForm from '@/views/Invoice/components/Form.vue'
import Card from 'primevue/card'
import ApiTable from '@/components/Table/ApiTable.vue'
import Column from 'primevue/column'
import Button from 'primevue/button'
import { useRouter } from 'vue-router'
import { useInvoiceListState } from '@/models/Invoice/States'
import type { Invoice } from '@/models/Invoice/Model'
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
const listState = useInvoiceListState()
listState.defaultParams = {
	per_page: 10,
	fromRelation: {
		model: 'App\\Models\\TaxRate',
		id: props.taxRateId,
		relation: 'invoices',
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

async function dissociate(item: Invoice) {
	dissociateLoading.value = item.id
	emit('start-loading')
	try {
		await new TaxRatesApi().updateRelation(props.taxRateId, 'invoices', {
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

function openDetails(item: { data: Invoice }) {
	router.push({ name: 'invoices-edit', params: { id: item.data.id } })
}
</script>

<style lang="scss" scoped>
.invoices-relation-widget {
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

				.invoices-relation-widget__title {
					flex: 1;
					text-align: left;
				}
			}
		}
	}
}
</style>
