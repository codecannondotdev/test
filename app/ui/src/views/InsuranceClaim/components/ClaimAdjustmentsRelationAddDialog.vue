<template>
	<Drawer
		v-model:visible="isActive"
		position="right"
		class="insurance-claim-claim-adjustments-add-dialog"
		header="Add Claim Adjustment">
		<div class="insurance-claim-claim-adjustments-add-dialog__header">
			<div class="insurance-claim-claim-adjustments-add-dialog__assigned-filter-container">
				<div class="insurance-claim-claim-adjustments-add-dialog__assigned-filter-label-container">
					<label>Show all Claim Adjustments</label>
					<label
						><small
							>Assigning Claim Adjustments to this Insurance Claim will change their current
							assignment</small
						></label
					>
				</div>
				<ToggleSwitch v-model="withAssigned" />
			</div>
			<div class="insurance-claim-claim-adjustments-add-dialog__search-container">
				<IconField>
					<InputIcon class="fal fa-search" />
					<InputText
						v-model="searchString"
						class="insurance-claim-claim-adjustments-add-dialog__search-input"
						placeholder="Search"
						@update:model-value="listState.getList({ search: searchString })"
						@keyup.enter="listState.getList({ search: searchString })"></InputText>
				</IconField>
			</div>
		</div>
		<div class="insurance-claim-claim-adjustments-add-dialog__table-container">
			<ApiTable
				v-model:selection="selected"
				selection-mode="multiple"
				flat
				:list-state="listState">
				<Column
					selection-mode="multiple"
					header-style="width: 3rem"></Column>
				<Column
					field="adjustment_code"
					header="Adjustment Code" />
			</ApiTable>
		</div>
		<div class="insurance-claim-claim-adjustments-add-dialog__add-buttton-container">
			<Button
				class="insurance-claim-claim-adjustments-add-dialog__add-button"
				:disabled="selected.length === 0"
				:loading="isLoading"
				:label="`Add ${selected.length} Claim Adjustments`"
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
import type { InsuranceClaim } from '@/models/InsuranceClaim/Model'
import { defineModel, ref, watch } from 'vue'
import type { ClaimAdjustment } from '@/models/ClaimAdjustment/Model'
import { useClaimAdjustmentListState } from '@/models/ClaimAdjustment/States'
import InsuranceClaimsApi from '@/models/InsuranceClaim/Api'

const emit = defineEmits(['update'])

const isActive = defineModel<boolean>()

const props = defineProps<{
	insuranceClaimId: InsuranceClaim['id']
}>()

const selected = ref<ClaimAdjustment[]>([])
const isLoading = ref(false)
const searchString = ref('')
const withAssigned = ref(false)

const listState = useClaimAdjustmentListState()
listState.defaultParams = {
	notFromRelation: {
		model: 'App\\Models\\InsuranceClaim',
		id: props.insuranceClaimId,
		relation: 'claimAdjustments',
	},
}

watch(
	withAssigned,
	() => {
		if (withAssigned.value) {
			listState.query().save()
		} else {
			listState.query().whereDoesntHave('insuranceClaim').save()
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
			selected.value = []
			listState.clearList()
		} else {
			listState.getList()
		}
	},
	{ immediate: true },
)

async function submit() {
	isLoading.value = true
	try {
		await new InsuranceClaimsApi().updateRelation(props.insuranceClaimId, 'claimAdjustments', {
			method: 'associate',
			params: selected.value.map((item) => item.id),
		})
		isActive.value = false
		emit('update')
		selected.value = []
	} finally {
		isLoading.value = false
	}
}
</script>

<style lang="scss">
.insurance-claim-claim-adjustments-add-dialog {
	width: 800px !important;

	.p-drawer-content {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding: 0;
	}

	.insurance-claim-claim-adjustments-add-dialog__header {
		padding: 10px;
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		justify-content: space-between;
		gap: 20px;

		.insurance-claim-claim-adjustments-add-dialog__search-container {
			flex: 1;
			width: 100%;

			.insurance-claim-claim-adjustments-add-dialog__search-input {
				width: 100%;
			}
		}

		.insurance-claim-claim-adjustments-add-dialog__assigned-filter-container {
			display: flex;
			align-items: center;
			justify-content: space-between;
			gap: 10px;

			.insurance-claim-claim-adjustments-add-dialog__assigned-filter-label-container {
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

	.insurance-claim-claim-adjustments-add-dialog__table-container {
		border-top: 1px solid var(--p-datatable-body-cell-border-color);
		flex: 1;
		overflow: auto;
		display: flex;

		.ui-api-table__table {
			flex: 1;
		}
	}

	.insurance-claim-claim-adjustments-add-dialog__add-buttton-container {
		padding: 20px;
		display: flex;
		justify-content: flex-end;
		border-top: 1px solid var(--p-datatable-body-cell-border-color);

		.insurance-claim-claim-adjustments-add-dialog__add-button {
			min-height: 39px;
		}
	}
}
</style>
