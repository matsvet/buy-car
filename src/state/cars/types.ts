import { CaseReducer } from '@reduxjs/toolkit';

export interface ICarsState {
  loading: boolean;
  error: string | null;
  cars: ICar[] | null;
}

export type ReducersType = {
  clearCars: CaseReducer<ICarsState>;
};

interface Oid {
  $oid: string;
}

interface Tag {
  [index: number]: number; // Предполагая, что теги - это массив чисел
}

export interface ICar {
  _id: Oid;
  name: string;
  settlement: string;
  isShowroom: boolean;
  sellerType: null | any; // Тип продавца не указан, предполагаем, что может быть любым или null
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
  favorite: any | null; // Тип не указан, предполагаем, что может быть любым или null
  rowColor: any | null; // Тип не указан, предполагаем, что может быть любым или null
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
  placeholder: any | null; // Тип не указан, предполагаем, что может быть любым или null
  saleDays: number | null;
  inStock: boolean | null;
  isCurrent: boolean | null;
  isExclude: boolean;
  eventType: any | null; // Тип не указан, предполагаем, что может быть любым или null
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
  id: number;
  modelId: number;
  generationId: number;
  year: number;
  modificationId: number | null;
  price: number;
  mileage: number;
  bodyType: number;
  transmission: number;
  generation: any | null; // Тип не указан, предполагаем, что может быть любым или null
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
}
