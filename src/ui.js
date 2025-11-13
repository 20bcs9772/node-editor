"use client"

// ui.js
// Displays the drag-and-drop UI
// --------------------------------------------------

import { useState, useRef, useCallback } from "react"
import ReactFlow, { Controls, Background, MiniMap } from "reactflow"
import { useStore } from "./store"
import { shallow } from "zustand/shallow"
import { InputNode } from "./nodes/inputNode"
import { LLMNode } from "./nodes/llmNode"
import { OutputNode } from "./nodes/outputNode"
import { TextNode } from "./nodes/textNode"

import "reactflow/dist/style.css"
import { AggregatorNode } from "./nodes/aggregatorNode"
import { ConditionalNode } from "./nodes/conditionalNode"
import { DelayNode } from "./nodes/delayNode"
import { TransformNode } from "./nodes/transformNode"
import { ValidatorNode } from "./nodes/validatorNode"
import "./ui.css"

const gridSize = 20
const proOptions = { hideAttribution: true }
const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  aggregator: AggregatorNode,
  conditional: ConditionalNode,
  delay: DelayNode,
  transform: TransformNode,
  validator: ValidatorNode,
}

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
})

export const PipelineUI = () => {
  const reactFlowWrapper = useRef(null)
  const [reactFlowInstance, setReactFlowInstance] = useState(null)
  const { nodes, edges, getNodeID, addNode, onNodesChange, onEdgesChange, onConnect } = useStore(selector, shallow)

  const getInitNodeData = (nodeID, type) => {
    const nodeData = { id: nodeID, nodeType: `${type}` }
    return nodeData
  }

  const onDrop = useCallback(
    (event) => {
      event.preventDefault()

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect()
      if (event?.dataTransfer?.getData("application/reactflow")) {
        const appData = JSON.parse(event.dataTransfer.getData("application/reactflow"))
        const type = appData?.nodeType

        if (typeof type === "undefined" || !type) {
          return
        }

        const position = reactFlowInstance.project({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        })

        const nodeID = getNodeID(type)

        const newNode = {
          id: nodeID,
          type,
          position,
          data: getInitNodeData(nodeID, type),
        }

        addNode(newNode)
      }
    },
    [reactFlowInstance, getNodeID, addNode],
  )

  const onDragOver = useCallback((event) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = "move"
  }, [])

  return (
    <div className="pipeline-ui-wrapper">
      <div ref={reactFlowWrapper} className="pipeline-canvas">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onInit={setReactFlowInstance}
          nodeTypes={nodeTypes}
          proOptions={proOptions}
          snapGrid={[gridSize, gridSize]}
          connectionLineType="smoothstep"
        >
          <Background color="var(--border-color)" gap={gridSize} />
          <Controls />
          <MiniMap />
        </ReactFlow>
      </div>
    </div>
  )
}
