import { Collapse, Flex, Tag } from 'antd'
import React from 'react'

import JsonHelight from '@/components/JsonHelight.tsx'
import { SsoPacket } from '@/types/SsoPacket.ts'

const PacketView: React.FC<PacketViewProps> = ({ packet, isResp = false }) => {
  return (
    <Collapse
      className="w-[98%]"
      items={[
        {
          key: packet.seq,
          label: (
            <div>
              <Flex gap="small">
                <div className="text-[#2d00fd]">{`command: ${packet.cmd}`}</div>
                {isResp &&
                  (packet.seq > 0 ? (
                    <Tag color="red">resp</Tag>
                  ) : (
                    <Tag color="green">push</Tag>
                  ))}
              </Flex>
              <div>{`seq: ${packet.seq}`}</div>
            </div>
          ),
          children: (
            <JsonHelight code={JSON.stringify(packet.body_proto, null, 2)} />
          ),
        },
      ]}
    ></Collapse>
  )
}

export default PacketView

export interface PacketViewProps {
  packet: SsoPacket
  isResp?: boolean
}
