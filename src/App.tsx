import { Button, Flex, Input, notification } from 'antd'
import { useState } from 'react'

import ColumnView from '@/components/ColumnView.tsx'
import { SsoPacket } from '@/types/SsoPacket.ts'
import { TeaCrypt } from '@/types/TeaCrypt.ts'

function App() {
  const [api, contextHolder] = notification.useNotification()
  const [websocketState, setWebsocketState] = useState<WebSocket | null>(null)
  const [sendData, setSendData] = useState<SsoPacket[]>([])
  const [recvData, setRecvData] = useState<SsoPacket[]>([])

  const [wsUrl, setwsUrl] = useState(`${window.location.host}/ws`)
  const [loading, setLoading] = useState(false)
  const [isConnected, setIsConnected] = useState<boolean>(false)

  const onClick = () => {
    setLoading(() => true)
    if (isConnected) {
      disConnect()
    } else {
      connect(wsUrl)
    }
  }

  const connect = (url: string) => {
    const ws = new WebSocket('ws://' + url)

    ws.addEventListener('open', () => {
      setIsConnected(true)
      setLoading(false)
      console.log('connect ' + url)
      api['success']({
        message: 'websocket 已连接',
        duration: 1.5,
      })
    })

    ws.addEventListener('close', () => {
      setIsConnected(false)
      console.log('close connection')
      api['info']({
        message: 'websocket 已断开',
        duration: 1.5,
      })
    })

    ws.addEventListener('error', () => {
      api['error']({
        message: 'websocket 异常',
        duration: 2,
      })
    })

    ws.addEventListener('message', handleMessage)

    setWsWrapper(ws)
  }

  const disConnect = () => {
    if (websocketState) {
      websocketState.addEventListener('close', () => setLoading(false))
      websocketState.close()
    }
    setWebsocketState(null)
  }

  const setWsWrapper = (ws: WebSocket) => {
    if (websocketState) {
      websocketState.close()
    }
    setWebsocketState(ws)
  }

  const handleMessage = (message: MessageEvent) => {
    const tea = JSON.parse(message.data) as TeaCrypt
    console.log(tea)
    if (tea.type === 'teaEncrypt') {
      setSendData((data) => {
        const temp_data = data.slice()
        temp_data.push(tea.packet)
        return temp_data
      })
    } else if (tea.type === 'teaDecrypt') {
      setRecvData((data) => {
        const temp_data = data.slice()
        temp_data.push(tea.packet)
        return temp_data
      })
    }
  }

  return (
    <div className="h-full w-svw">
      {contextHolder}
      <Flex gap="middle" vertical justify="flex-start">
        <Flex gap="middle" vertical>
          <Flex gap="middle">
            <Input
              addonBefore="ws://"
              defaultValue={wsUrl}
              style={{ width: '20%' }}
              onChange={(e) => setwsUrl(() => e.target.value)}
            />
            <Button
              type="primary"
              loading={loading}
              autoInsertSpace={false}
              onClick={onClick}
            >
              {isConnected ? '断开' : '连接'}
            </Button>
          </Flex>
        </Flex>
        <div>
          <ColumnView sendDataSource={sendData} recvDataSource={recvData} />
        </div>
      </Flex>
    </div>
  )
}

export default App
