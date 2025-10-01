<template>
	<Card class="consent-forms-relation-widget">
		<template #title>
			<h4 class="consent-forms-relation-widget__title">Consent Forms</h4>
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
					field="form_type"
					header="Form Type" />
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
	<ConsentFormsRelationAddDialog
		v-model="isRelationAddDialogActive"
		:procedure-id="props.procedureId"
		@update="refresh()" />
	<ConsentFormForm
		:as-dialog="true"
		:visible="isFormActive"
		:should-redirect="false"
		:force-values="{ procedure_id: Number(props.procedureId) }"
		:hide-inputs="['procedure_id']"
		@close="isFormActive = false"
		@created="refresh()" />
</template>

<script setup lang="ts">
import { defineProps, onBeforeMount, ref } from 'vue'
import ConsentFormsRelationAddDialog from './ConsentFormsRelationAddDialog.vue'
import ConsentFormForm from '@/views/ConsentForm/components/Form.vue'
import Card from 'primevue/card'
import ApiTable from '@/components/Table/ApiTable.vue'
import Column from 'primevue/column'
import Button from 'primevue/button'
import { useRouter } from 'vue-router'
import { useConsentFormListState } from '@/models/ConsentForm/States'
import type { ConsentForm } from '@/models/ConsentForm/Model'
import type { Procedure } from '@/models/Procedure/Model'
import ProceduresApi from '@/models/Procedure/Api'

const emit = defineEmits(['start-loading', 'stop-loading'])

const props = defineProps<{
	procedureId: Procedure['id']
}>()

const router = useRouter()
const isRelationAddDialogActive = ref(false)
const isFormActive = ref(false)
const dissociateLoading = ref(null as null | number | string)
const listLoading = ref(false)
const listState = useConsentFormListState()
listState.defaultParams = {
	per_page: 10,
	fromRelation: {
		model: 'App\\Models\\Procedure',
		id: props.procedureId,
		relation: 'consentForms',
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

async function dissociate(item: ConsentForm) {
	dissociateLoading.value = item.id
	emit('start-loading')
	try {
		await new ProceduresApi().updateRelation(props.procedureId, 'consentForms', {
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

function openDetails(item: { data: ConsentForm }) {
	router.push({ name: 'consent-forms-edit', params: { id: item.data.id } })
}
</script>

<style lang="scss" scoped>
.consent-forms-relation-widget {
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

				.consent-forms-relation-widget__title {
					flex: 1;
					text-align: left;
				}
			}
		}
	}
}
</style>
