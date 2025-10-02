import type { KartaModel } from '@/models/Karta/Model'
import KartasApi from '@/models/Karta/Api'
import DetailsState from '@/helpers/models/DetailsState'
import ListState from '@/helpers/models/ListState'
import type { LaravelPaginationResponse } from '@/interfaces/models/Laravel'

export class KartaDetailsState extends DetailsState<KartasApi, KartaModel> {
	api = new KartasApi()
}

export function useKartaDetailsState() {
	return new KartaDetailsState()
}

export class KartaListState extends ListState<
	KartasApi,
	KartaModel,
	LaravelPaginationResponse<KartaModel>
> {
	api = new KartasApi()
}

export function useKartaListState() {
	return new KartaListState()
}
