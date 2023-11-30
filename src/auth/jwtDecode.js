import { Buffer } from "buffer"

export const jwtDecode = (token)=> JSON.parse(token.split('.').map((part) => Buffer.from(part.replace(/-/g, '+').replace(/_/g, '/'),'base64').toString())[1])