import { StatusType } from "./StatusType";
import { voucherType } from "./VoucherType";

import { Dayjs } from "dayjs";

export interface SearchVoucherForm {
    value: number|undefined,
    status: StatusType|undefined,
    title: string|undefined,
    voucherType: voucherType|undefined,
    from: Dayjs|string|undefined,
    to: Dayjs|string|undefined,
    page: number,
    size: number,
}