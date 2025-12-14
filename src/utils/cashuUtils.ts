
import {CashuWallet, Proof, Token,} from "@cashu/cashu-ts";
import { Invoice } from "@getalby/lightning-tools"

//estimate value of token
async function getSatValue(wallet:CashuWallet, token:Token):Promise<number> {
    const mintQuote = await wallet.createMintQuote(1)
    const {satoshi:rate} = new Invoice({pr:mintQuote.request})
    return Math.floor(sumProofs(token.proofs)*rate)
}

//estimate value of single token unit
async function getSatPerUnit(wallet:CashuWallet):Promise<number> {
    const mintQuote = await wallet.createMintQuote(1)
    const {satoshi:rate} = new Invoice({pr:mintQuote.request})
    return Math.floor(rate)
}

function sumProofs(proofs: Proof[]): number {
    return proofs.reduce((sum, proof) => sum + proof.amount, 0)
}


export {  getSatValue, getSatPerUnit, sumProofs };
