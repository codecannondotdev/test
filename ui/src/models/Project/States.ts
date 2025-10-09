import type { ProjectModel } from '@/models/Project/Model'
import ProjectsApi from '@/models/Project/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class ProjectDetailsState extends DetailsState<ProjectsApi, ProjectModel> {
	api = new ProjectsApi()
}

export function useProjectDetailsState() {
	return new ProjectDetailsState()
}

export class ProjectListState extends ListState<
	ProjectsApi,
	ProjectModel,
	LaravelPaginationResponse<ProjectModel>
> {
	api = new ProjectsApi()
}

export function useProjectListState() {
	return new ProjectListState()
}
