import type {
	MaterialModel,
	MaterialStorePayload,
	MaterialUpdatePayload,
} from '@/models/Material/Model'
import Api from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export default class MaterialsApi extends Api<
	MaterialModel,
	LaravelPaginationResponse<MaterialModel>,
	MaterialStorePayload,
	MaterialUpdatePayload
> {
	route = 'materials'
}
