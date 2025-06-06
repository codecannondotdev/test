import type { CarModelModel } from '@/models/CarModel/Model'
import CarModelsApi from '@/models/CarModel/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class CarModelDetailsState extends DetailsState<CarModelsApi, CarModelModel> {
	api = new CarModelsApi()
}

export function useCarModelDetailsState() {
	return new CarModelDetailsState()
}

export class CarModelListState extends ListState<
	CarModelsApi,
	CarModelModel,
	LaravelPaginationResponse<CarModelModel>
> {
	api = new CarModelsApi()
}

export function useCarModelListState() {
	return new CarModelListState()
}
