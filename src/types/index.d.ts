import {MeltQuoteResponse} from "@cashu/cashu-ts";

type MeltQuoteAcceptanceProps = {
    meltQuote: MeltQuoteResponse,
    onAccept: () => void,
    onReject: () => void,
}

type ChangeItem = {
    mint: string
    unit: string
    amount: number
}

export {
    MeltQuoteAcceptanceProps,
    ChangeItem,
}

