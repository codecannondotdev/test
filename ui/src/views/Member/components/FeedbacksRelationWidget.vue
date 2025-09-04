<template>
	<Card class="feedbacks-relation-widget">
		<template #title>
			<h4 class="feedbacks-relation-widget__title">Feedbacks</h4>
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
					field="comment"
					header="Comment" />
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
	<FeedbacksRelationAddDialog
		v-model="isRelationAddDialogActive"
		:member-id="props.memberId"
		@update="refresh()" />
	<FeedbackForm
		:as-dialog="true"
		:visible="isFormActive"
		:should-redirect="false"
		:force-values="{ member_id: Number(props.memberId) }"
		:hide-inputs="['member_id']"
		@close="isFormActive = false"
		@created="refresh()" />
</template>

<script setup lang="ts">
import { defineProps, onBeforeMount, ref } from 'vue'
import FeedbacksRelationAddDialog from './FeedbacksRelationAddDialog.vue'
import FeedbackForm from '@/views/Feedback/components/Form.vue'
import Card from 'primevue/card'
import ApiTable from '@/components/Table/ApiTable.vue'
import Column from 'primevue/column'
import Button from 'primevue/button'
import { useRouter } from 'vue-router'
import { useFeedbackListState } from '@/models/Feedback/States'
import type { Feedback } from '@/models/Feedback/Model'
import type { Member } from '@/models/Member/Model'
import MembersApi from '@/models/Member/Api'

const emit = defineEmits(['start-loading', 'stop-loading'])

const props = defineProps<{
	memberId: Member['id']
}>()

const router = useRouter()
const isRelationAddDialogActive = ref(false)
const isFormActive = ref(false)
const dissociateLoading = ref(null as null | number | string)
const listLoading = ref(false)
const listState = useFeedbackListState()
listState.defaultParams = {
	per_page: 10,
	fromRelation: {
		model: 'App\\Models\\Member',
		id: props.memberId,
		relation: 'feedbacks',
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

async function dissociate(item: Feedback) {
	dissociateLoading.value = item.id
	emit('start-loading')
	try {
		await new MembersApi().updateRelation(props.memberId, 'feedbacks', {
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

function openDetails(item: { data: Feedback }) {
	router.push({ name: 'feedbacks-edit', params: { id: item.data.id } })
}
</script>

<style lang="scss" scoped>
.feedbacks-relation-widget {
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

				.feedbacks-relation-widget__title {
					flex: 1;
					text-align: left;
				}
			}
		}
	}
}
</style>
