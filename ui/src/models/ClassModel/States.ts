import type { ClassModelModel } from '@/models/ClassModel/Model'
import ClassModelsApi from '@/models/ClassModel/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class ClassModelDetailsState extends DetailsState<ClassModelsApi, ClassModelModel> {
	api = new ClassModelsApi()
}

export function useClassModelDetailsState() {
	return new ClassModelDetailsState()
}

export class ClassModelListState extends ListState<
	ClassModelsApi,
	ClassModelModel,
	LaravelPaginationResponse<ClassModelModel>
> {
	api = new ClassModelsApi()
}

export function useClassModelListState() {
	return new ClassModelListState()
}
