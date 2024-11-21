import { List } from 'antd'
import React, { useRef } from 'react'
import { Scrollbars } from 'react-custom-scrollbars-2'

import PacketView from '@/components/PacketView.tsx'
import { SsoPacket } from '@/types/SsoPacket.ts'

const ColumnView: React.FC<ColumnViewProps> = ({
  sendDataSource,
  recvDataSource,
}) => {
  const leftScrollbarsRef = useRef(null)
  const rightScrollbarsRef = useRef(null)

  return (
    <>
      <div className="float-left w-[49%] text-left">
        <Scrollbars style={{ height: '90vh' }} ref={leftScrollbarsRef}>
          <List
            dataSource={sendDataSource}
            renderItem={(item) => {
              return (
                <List.Item key={item.seq}>
                  <PacketView packet={item} />
                </List.Item>
              )
            }}
          />
        </Scrollbars>
      </div>

      <div className="float-right w-[49%] text-left">
        <Scrollbars style={{ height: '90vh' }} ref={rightScrollbarsRef}>
          <List
            dataSource={recvDataSource}
            renderItem={(item) => {
              return (
                <List.Item key={item.seq}>
                  <PacketView packet={item} isResp={true} />
                </List.Item>
              )
            }}
          />
        </Scrollbars>
      </div>
    </>
  )
}

export default ColumnView

export interface ColumnViewProps {
  sendDataSource: SsoPacket[]
  recvDataSource: SsoPacket[]
}
