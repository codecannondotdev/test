import type { MaterialModel } from '@/models/Material/Model'
import MaterialsApi from '@/models/Material/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class MaterialDetailsState extends DetailsState<MaterialsApi, MaterialModel> {
	api = new MaterialsApi()
}

export function useMaterialDetailsState() {
	return new MaterialDetailsState()
}

export class MaterialListState extends ListState<
	MaterialsApi,
	MaterialModel,
	LaravelPaginationResponse<MaterialModel>
> {
	api = new MaterialsApi()
}

export function useMaterialListState() {
	return new MaterialListState()
}
