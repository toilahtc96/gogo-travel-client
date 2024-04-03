import { StatusType } from "./StatusType";

export default interface TourType {
    id: number | undefined,
    tourCode: string | undefined,
    dayInTour: string | undefined,
    tourName: string | undefined,
    tourSmallInformation: string | undefined,
    priceOncePerson: StatusType | undefined,
    benefit: string | undefined,
    specialInTour: string | undefined,
    status: StatusType | undefined,
    mainBackgroundUrl: string | undefined
    informationUrl: string | undefined
    contactBackgroundUrl: string | undefined
}
