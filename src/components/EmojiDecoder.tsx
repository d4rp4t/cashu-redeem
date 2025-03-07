"use client"

import { type RefObject, useRef } from "react"
import { motion } from "framer-motion"
import { X } from "lucide-react"
import { decode } from "@/utils/emojiEncoding"
import toast from "react-hot-toast"
import { Dancing_Script } from 'next/font/google'

interface EmojiDecoderProps {
    tokenInputRef: RefObject<HTMLInputElement | null>
    onClose: () => void
    handleError: (e: unknown) => void
}

const dancingScript = Dancing_Script()
export default function EmojiDecoder({ tokenInputRef, onClose, handleError }: EmojiDecoderProps) {
    const encodedText = useRef<HTMLInputElement>(null)

    const handleDecode = () => {
        if (!encodedText || !encodedText.current) {
            return
        }
        const textToDecode = encodedText.current.value

        try {
            const decodedText = decode(textToDecode)

            if (!tokenInputRef || !tokenInputRef.current) {
                return
            }
            tokenInputRef.current.value = decodedText

            if (!decodedText) {
                throw new Error("Couldn't decode this emoji :(")
            }
            toast.success("yeah, there is money in that emoji")
            onClose()
        } catch (err) {
            handleError(err)
            return
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black bg-opacity-50"
        >
            <motion.div
                initial={{ y: 50 }}
                animate={{ y: 0 }}
                className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md relative overflow-hidden"
            >
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
                >
                    <X className="w-5 h-5 text-gray-500" />
                </button>
                <h2 className="text-2xl text-gray-900 mb-4">🥜 <span className={dancingScript.className}>e in ecash stands for emoji</span> 🥜</h2>
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <input
                            type="text"
                            ref={encodedText}
                            placeholder="Enter emoji to decode..."
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                        />
                        <button
                            onClick={handleDecode}
                            className="px-4 py-2 bg-violet-500 text-white rounded-md hover:bg-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-opacity-50 transition-colors duration-200"
                        >
                            Decode
                        </button>
                    </div>
                </div>
                <div className="w-full text-center mt-4">
                    <a
                        href="https://github.com/paulgb/emoji-encoder/tree/main"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-200 text-sm hover:text-violet-500 transition-colors duration-200 inline-block"
                    >
                        emoji-decoder
                    </a>
                </div>
            </motion.div>
        </motion.div>
    )
}

