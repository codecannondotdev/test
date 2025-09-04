import type {
	ProgramModel,
	ProgramStorePayload,
	ProgramUpdatePayload,
} from '@/models/Program/Model'
import Api from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export default class ProgramsApi extends Api<
	ProgramModel,
	LaravelPaginationResponse<ProgramModel>,
	ProgramStorePayload,
	ProgramUpdatePayload
> {
	route = 'programs'
}
