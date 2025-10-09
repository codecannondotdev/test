import type {
	ProjectModel,
	ProjectStorePayload,
	ProjectUpdatePayload,
} from '@/models/Project/Model'
import Api from '@/helpers/models/Api'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export default class ProjectsApi extends Api<
	ProjectModel,
	LaravelPaginationResponse<ProjectModel>,
	ProjectStorePayload,
	ProjectUpdatePayload
> {
	route = 'projects'
}
