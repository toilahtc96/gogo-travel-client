import { StatusType } from "./StatusType";
import { voucherType } from "./VoucherType";

import { Dayjs } from "dayjs";

export interface Voucher {
    id: number|undefined,
    value: number|undefined,
    status: StatusType|undefined,
    title: string|undefined,
    voucherType: voucherType|undefined,
    startTime: Dayjs|string|undefined,
    endTime: Dayjs|string|undefined,
}