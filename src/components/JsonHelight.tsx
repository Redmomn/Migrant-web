import React from 'react'
// @ts-expect-error: Missing type declaration for the imported module
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
// @ts-expect-error: Missing type declaration for the imported module
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs'

const JsonHelight: React.FC<DataViewProps> = ({ code }) => {
  return (
    <>
      <div className="text-left">
        <SyntaxHighlighter language="JavaScript" style={docco}>
          {code}
        </SyntaxHighlighter>
      </div>
    </>
  )
}

export default JsonHelight

export interface DataViewProps {
  code: string
}
