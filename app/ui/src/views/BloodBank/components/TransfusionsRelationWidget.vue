<template>
	<Card class="transfusions-relation-widget">
		<template #title>
			<h4 class="transfusions-relation-widget__title">Transfusions</h4>
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
				<Column header="Transfusion Date">
					<template #body="slotProps">
						{{ format(new Date(slotProps.data.transfusion_date), 'yyyy-MM-dd HH:mm') }}
					</template>
				</Column>
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
	<TransfusionsRelationAddDialog
		v-model="isRelationAddDialogActive"
		:blood-bank-id="props.bloodBankId"
		@update="refresh()" />
	<TransfusionForm
		:as-dialog="true"
		:visible="isFormActive"
		:should-redirect="false"
		:force-values="{ blood_bank_id: Number(props.bloodBankId) }"
		:hide-inputs="['blood_bank_id']"
		@close="isFormActive = false"
		@created="refresh()" />
</template>

<script setup lang="ts">
import { defineProps, onBeforeMount, ref } from 'vue'
import TransfusionsRelationAddDialog from './TransfusionsRelationAddDialog.vue'
import TransfusionForm from '@/views/Transfusion/components/Form.vue'
import Card from 'primevue/card'
import ApiTable from '@/components/Table/ApiTable.vue'
import Column from 'primevue/column'
import Button from 'primevue/button'
import { useRouter } from 'vue-router'
import { useTransfusionListState } from '@/models/Transfusion/States'
import type { Transfusion } from '@/models/Transfusion/Model'
import type { BloodBank } from '@/models/BloodBank/Model'
import BloodBanksApi from '@/models/BloodBank/Api'
import { format } from 'date-fns'

const emit = defineEmits(['start-loading', 'stop-loading'])

const props = defineProps<{
	bloodBankId: BloodBank['id']
}>()

const router = useRouter()
const isRelationAddDialogActive = ref(false)
const isFormActive = ref(false)
const dissociateLoading = ref(null as null | number | string)
const listLoading = ref(false)
const listState = useTransfusionListState()
listState.defaultParams = {
	per_page: 10,
	fromRelation: {
		model: 'App\\Models\\BloodBank',
		id: props.bloodBankId,
		relation: 'transfusions',
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

async function dissociate(item: Transfusion) {
	dissociateLoading.value = item.id
	emit('start-loading')
	try {
		await new BloodBanksApi().updateRelation(props.bloodBankId, 'transfusions', {
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

function openDetails(item: { data: Transfusion }) {
	router.push({ name: 'transfusions-edit', params: { id: item.data.id } })
}
</script>

<style lang="scss" scoped>
.transfusions-relation-widget {
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

				.transfusions-relation-widget__title {
					flex: 1;
					text-align: left;
				}
			}
		}
	}
}
</style>
