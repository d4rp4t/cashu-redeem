import {MeltQuoteResponse} from "@cashu/cashu-ts";

type LNURLResponse = {
    callback: string;
    maxSendable: number;
    minSendable: number;
    metadata: string;
}


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
    LNURLResponse,
    MeltQuoteAcceptanceProps,
    ChangeItem,
}

