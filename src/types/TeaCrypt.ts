import { SsoPacket } from '@/types/SsoPacket.ts'

export type TeaCrypt = {
  type: 'teaEncrypt' | 'teaDecrypt'
  packet: SsoPacket
  key: string
  timestamp: string
}
