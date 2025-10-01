<template>
	<Drawer
		v-model:visible="isActive"
		position="right"
		class="prescription-pharmacy-order-add-dialog"
		header="Add Pharmacy Order">
		<div class="prescription-pharmacy-order-add-dialog__header">
			<div class="prescription-pharmacy-order-add-dialog__assigned-filter-container">
				<div class="prescription-pharmacy-order-add-dialog__assigned-filter-label-container">
					<label>Show all Pharmacy Orders</label>
					<label
						><small
							>Assigning Pharmacy Order to this Prescription will change their current
							assignment</small
						></label
					>
				</div>
				<ToggleSwitch v-model="withAssigned" />
			</div>
			<div class="prescription-pharmacy-order-add-dialog__search-container">
				<IconField>
					<InputIcon class="fal fa-search" />
					<InputText
						v-model="searchString"
						class="prescription-pharmacy-order-add-dialog__search-input"
						placeholder="Search"
						@update:model-value="listState.getList({ search: searchString })"
						@keyup.enter="listState.getList({ search: searchString })"></InputText>
				</IconField>
			</div>
		</div>
		<div class="prescription-pharmacy-order-add-dialog__table-container">
			<ApiTable
				v-model:selection="selected"
				selection-mode="single"
				flat
				:list-state="listState">
				<Column
					selection-mode="single"
					header-style="width: 3rem"></Column>
				<Column
					field="order_date"
					header="Order Date" />
			</ApiTable>
		</div>
		<div class="prescription-pharmacy-order-add-dialog__add-buttton-container">
			<Button
				class="prescription-pharmacy-order-add-dialog__add-button"
				:disabled="!selected"
				:loading="isLoading"
				:label="`Change Pharmacy Order`"
				icon="fal fa-plus"
				@click="submit" />
		</div>
	</Drawer>
</template>

<script setup lang="ts">
import Drawer from 'primevue/drawer'
import Button from 'primevue/button'
import ApiTable from '@/components/Table/ApiTable.vue'
import Column from 'primevue/column'
import InputText from 'primevue/inputtext'
import InputIcon from 'primevue/inputicon'
import IconField from 'primevue/iconfield'
import ToggleSwitch from 'primevue/toggleswitch'
import type { Prescription } from '@/models/Prescription/Model'
import { defineModel, ref, watch } from 'vue'
import type { PharmacyOrder } from '@/models/PharmacyOrder/Model'
import { usePharmacyOrderListState } from '@/models/PharmacyOrder/States'
import PrescriptionsApi from '@/models/Prescription/Api'

const emit = defineEmits(['update'])

const isActive = defineModel<boolean>()

const props = defineProps<{
	prescriptionId: Prescription['id']
}>()

const selected = ref<PharmacyOrder | null>()
const isLoading = ref(false)
const searchString = ref('')
const withAssigned = ref(false)

const listState = usePharmacyOrderListState()
listState.defaultParams = {
	notFromRelation: {
		model: 'App\\Models\\Prescription',
		id: props.prescriptionId,
		relation: 'pharmacyOrder',
	},
}

watch(
	withAssigned,
	() => {
		if (withAssigned.value) {
			listState.query().save()
		} else {
			listState.query().whereDoesntHave('prescription').save()
		}
		if (isActive.value) {
			listState.getList()
		}
	},
	{ immediate: true },
)

watch(
	isActive,
	() => {
		if (!isActive.value) {
			withAssigned.value = false
			searchString.value = ''
			selected.value = null
			listState.clearList()
		} else {
			listState.getList()
		}
	},
	{ immediate: true },
)

async function submit() {
	if (!selected.value) {
		return
	}
	isLoading.value = true
	try {
		await new PrescriptionsApi().updateRelation(props.prescriptionId, 'pharmacyOrder', {
			method: 'associate',
			params: [selected.value.id],
		})
		isActive.value = false
		emit('update')
		selected.value = null
	} finally {
		isLoading.value = false
	}
}
</script>

<style lang="scss">
.prescription-pharmacy-order-add-dialog {
	width: 800px !important;

	.p-drawer-content {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding: 0;
	}

	.prescription-pharmacy-order-add-dialog__header {
		padding: 10px;
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		justify-content: space-between;
		gap: 20px;

		.prescription-pharmacy-order-add-dialog__search-container {
			flex: 1;
			width: 100%;

			.prescription-pharmacy-order-add-dialog__search-input {
				width: 100%;
			}
		}

		.prescription-pharmacy-order-add-dialog__assigned-filter-container {
			display: flex;
			align-items: center;
			justify-content: space-between;
			gap: 10px;

			.prescription-pharmacy-order-add-dialog__assigned-filter-label-container {
				display: flex;
				flex-direction: column;

				& > label {
					line-height: 1.2;
					text-align: right;

					small {
						opacity: 0.5;
					}
				}
			}
		}
	}

	.prescription-pharmacy-order-add-dialog__table-container {
		border-top: 1px solid var(--p-datatable-body-cell-border-color);
		flex: 1;
		overflow: auto;
		display: flex;

		.ui-api-table__table {
			flex: 1;
		}
	}

	.prescription-pharmacy-order-add-dialog__add-buttton-container {
		padding: 20px;
		display: flex;
		justify-content: flex-end;
		border-top: 1px solid var(--p-datatable-body-cell-border-color);

		.prescription-pharmacy-order-add-dialog__add-button {
			min-height: 39px;
		}
	}
}
</style>
