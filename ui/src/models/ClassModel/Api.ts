import type {
	ClassModelModel,
	ClassModelStorePayload,
	ClassModelUpdatePayload,
} from '@/models/ClassModel/Model'
import Api from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export default class ClassModelsApi extends Api<
	ClassModelModel,
	LaravelPaginationResponse<ClassModelModel>,
	ClassModelStorePayload,
	ClassModelUpdatePayload
> {
	route = 'classes'
}
