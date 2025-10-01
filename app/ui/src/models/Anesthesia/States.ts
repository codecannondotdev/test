import type { AnesthesiaModel } from '@/models/Anesthesia/Model'
import AnesthesiasApi from '@/models/Anesthesia/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class AnesthesiaDetailsState extends DetailsState<AnesthesiasApi, AnesthesiaModel> {
	api = new AnesthesiasApi()
}

export function useAnesthesiaDetailsState() {
	return new AnesthesiaDetailsState()
}

export class AnesthesiaListState extends ListState<
	AnesthesiasApi,
	AnesthesiaModel,
	LaravelPaginationResponse<AnesthesiaModel>
> {
	api = new AnesthesiasApi()
}

export function useAnesthesiaListState() {
	return new AnesthesiaListState()
}
