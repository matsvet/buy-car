import { CaseReducer } from '@reduxjs/toolkit';

export interface ICarsState {
  loading: boolean;
  loadingFavorites: boolean;
  loadingCompared: boolean;
  error: string | null;
  // errorFavorites: string | null;
  // errorCompared: string | null;
  cars: ICar[] | null;
  favoriteCars: ICar[] | null;
  comparedCars: ICar[] | null;
  totalItems: number | null;
  totalPages: number | null;
  currentPage: number;
  pageSize: number;
}

export interface ReducersType {
  clearCars: CaseReducer<ICarsState>;
}

interface Oid {
  $oid: string;
}

type Tag = Record<number, number>;

export interface ICar {
  _id: Oid;
  name: string;
  settlement: string;
  isShowroom: boolean;
  // sellerType: null | any; // Тип продавца не указан, предполагаем, что может быть любым или null
  isFakeNumber: boolean;
  phoneCount: number;
  previousPrice: number | null;
  markId: number;
  regionId: number;
  avitoRegionId: number;
  imvPrice: number;
  diff: number;
  diffLiteral: string;
  avgPriceType: string;
  localTime: string;
  utcTime: string;
  realUtcTime: string;
  is404: boolean;
  imagesCount: number;
  publishDate: string;
  saleDate: string | null;
  hasRegHistory: boolean;
  mainId: number | null;
  hasDouble: boolean;
  clicked: boolean;
  clickedByOther: boolean;
  called: boolean;
  favoriteId: number | null;
  // favorite: any | null; // Тип не указан, предполагаем, что может быть любым или null
  // rowColor: any | null; // Тип не указан, предполагаем, что может быть любым или null
  shopId: number | null;
  shopNetworkId: number | null;
  shopName: string | null;
  externSource: number;
  tags: Tag[];
  rating: number | null;
  isFavoriteShop: boolean | null;
  isFavoriteDouble: boolean | null;
  favoriteShopOwnerId: number | null;
  favoriteShopOwnerName: string | null;
  favoriteDoublesAmount: number | null;
  auctionId: number | null;
  // placeholder: any | null; // Тип не указан, предполагаем, что может быть любым или null
  saleDays: number | null;
  inStock: boolean | null;
  isCurrent: boolean | null;
  isExclude: boolean;
  // eventType: any | null; // Тип не указан, предполагаем, что может быть любым или null
  advertUrl: string | null;
  advertUserCallId: number | null;
  showPhone: boolean;
  autotekaCheckColorResult: number;
  autotekaBuyCheckColorState: number;
  settlementId: number | null;
  avitoLocationId: number | null;
  delayUntil: string | null;
  isDelayed: boolean;
  isArchive: boolean;
  isDisabledByPromocode: boolean;
  showAvgPriceStatistics: boolean;
  avgPrice: number;
  id: string;
  modelId: number;
  generationId: number;
  year: number;
  modificationId: number | null;
  price: number;
  mileage: number;
  bodyType: number;
  transmission: number;
  // generation: any | null; // Тип не указан, предполагаем, что может быть любым или null
  ownersCount: number;
  ownersCountText: string;
  drive: number;
  engine: number;
  volume: number;
  color: number;
  power: number | null;
  isBroked: boolean;
  vin: string | null;
  isRestrict: boolean | null;
  phone: string | null;
  sellerName: string | null;
  imageUrl: string;
  isRight: boolean;
  address: string | null;
  url: string | null;

  isFavorite?: boolean;
  isCompared?: boolean;
}

export interface IFavoriteOrComparedCar {
  _id: Oid;
  carId?: string;
  userId?: string;
  dateAdded?: string;
}

export interface ICarResponse {
  cars: ICar[];
  totalItems: number;
  currentPage: number;
  totalPages: number;
  pageSize: number;
}

export interface ICarRequestParams {
  userId: string | null;
  page: number | null;
  pageSize: number | null;
}
