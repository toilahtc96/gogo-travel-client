import { StatusType } from "./StatusType";

export default interface TourResponse {
    id: number | undefined,
    tourCode: string | undefined,
    dayInTour: string | undefined,
    tourName: string | undefined,
    tourSmallInformation: string | undefined,
    priceOncePerson: StatusType | undefined,
    benefits: [] | undefined,
    specialInTours: [] | undefined,
    status: StatusType | undefined,
    mainBackgroundUrl: string | undefined
    informationUrl: string | undefined
    contactBackgroundUrl: string | undefined
}
