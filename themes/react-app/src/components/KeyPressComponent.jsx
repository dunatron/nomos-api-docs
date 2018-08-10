import React from "react"
import { keyHandler, KEYPRESS } from "react-key-handler"

const KeyPressComponent = ({ keyValue }) => {
  console.log("A key was pressed ", keyValue)
  return (
    <div>
      {keyValue === "s" && (
        <ol>
          <li>hello</li>
          <li>world</li>
        </ol>
      )}
    </div>
  )
}

export default keyHandler({ keyEventName: KEYPRESS, keyValue: "s" })(
  KeyPressComponent
)
