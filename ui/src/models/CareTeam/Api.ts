import type {
	CareTeamModel,
	CareTeamStorePayload,
	CareTeamUpdatePayload,
} from '@/models/CareTeam/Model'
import Api from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export default class CareTeamsApi extends Api<
	CareTeamModel,
	LaravelPaginationResponse<CareTeamModel>,
	CareTeamStorePayload,
	CareTeamUpdatePayload
> {
	route = 'care-teams'
}
