import {WebLNProvider} from "@webbtc/webln-types";
import {LightningAddress} from "@getalby/lightning-tools";

//request invoice from Wallet Connect provider or from Lighting Address
async function createInvoice(amount:number, source:WebLNProvider|LightningAddress):Promise<string|undefined> {
    if(!source){
        throw new Error("source is missing");
    }
    if (source instanceof LightningAddress) {
        await source.fetch();
        const {paymentRequest} = await source.requestInvoice({satoshi: amount});
        return paymentRequest;
    } else {
        await source.enable();
        const {paymentRequest} = await source.makeInvoice(amount);
        return paymentRequest;
    }
}

export {createInvoice}
