import type {
	MiningOperationModel,
	MiningOperationStorePayload,
	MiningOperationUpdatePayload,
} from '@/models/MiningOperation/Model'
import Api from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export default class MiningOperationsApi extends Api<
	MiningOperationModel,
	LaravelPaginationResponse<MiningOperationModel>,
	MiningOperationStorePayload,
	MiningOperationUpdatePayload
> {
	route = 'mining-operations'
}
