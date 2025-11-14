# Node-Based Pipeline Editor

A modern, interactive node-based visual programming interface for building AI/ML pipelines with dynamic features and backend validation.

## Features

### Frontend (React + React Flow)

- **Dynamic Node System**: Reusable BaseNode component with configurable properties
- **Variable Detection**: Automatically detects `{{variable}}` patterns in text fields
- **Dynamic Input Handles**: Creates labeled input handles for each detected variable
- **Auto-Resizing Nodes**: Nodes grow/shrink based on content length
- **Multiple Node Types**: Input, Output, Text, LLM, Conditional, and Delay nodes
- **Visual Flow Editor**: Drag-and-drop interface with animated connections

### Frontend Setup

#### Installation

```bash
# Install dependencies
npm install
```

#### Running the Application

```bash
npm start
```

Frontend will be available at `http://localhost:3000`

## Core Features Implementation

### Dynamic Variable Detection

```javascript
// Text input: "Hello {{name}}, you have {{count}} messages"
// Automatically creates 2 input handles: "name" and "count"

// In textNode.js
enableVariables: true,        // Enable at node level
fields: [{
  enableVariables: true,      // Enable at field level
}]
```

### Dynamic Sizing

```javascript
// Node grows/shrinks based on text length
enableDynamicSize: true,      // Enable at node level
fields: [{
  enableDynamicSize: true,    // Enable at field level
}]
```

### Adding Features to Other Nodes

```javascript
// Example: Add variables to any node
export const MyCustomNode = createNode({
  label: "My Node",
  enableVariables: true, // Enable variable detection
  enableDynamicSize: true, // Enable auto-resizing
  fields: [
    {
      name: "myField",
      type: "textarea",
      enableVariables: true,
      enableDynamicSize: true,
    },
  ],
});
```

## API Endpoints

### Health Check

```bash
GET /
Response: {"Ping": "Pong"}
```

### Parse Pipeline

```bash
POST /pipelines/parse
Content-Type: application/x-www-form-urlencoded

Body:
  pipeline: JSON string containing nodes and edges

Response:
{
  "num_nodes": 3,
  "num_edges": 2,
  "is_dag": true
}
```


## DAG Validation Algorithm

The backend uses a **DFS-based cycle detection** algorithm:

```python
# Three-color marking scheme:
WHITE = 0  # Unvisited
GRAY = 1   # Currently visiting (in DFS path)
BLACK = 2  # Fully processed

# If we encounter a GRAY node during DFS:
# → Back edge detected → Cycle exists → NOT a DAG
```

**Time Complexity**: O(V + E)  
**Space Complexity**: O(V)


## Key Technical Highlights

### 1. **Modular Architecture**

- Reusable `BaseNode` component
- Configuration-based node creation
- No code duplication across node types

### 2. **React Best Practices**

- Proper hook usage (`useState`, `useEffect`)
- Memoization where needed
- Clean component lifecycle management

### 3. **Efficient Algorithms**

- O(V + E) DAG validation
- Optimized regex for variable extraction
- Dynamic rendering without unnecessary re-renders

### 4. **Scalability**

- Easy to add new node types
- Features can be enabled per node/field
- Backend can handle complex graphs

## Development Tips

### Adding a New Node Type

```javascript
// 1. Create new file: myNewNode.js
import { createNode } from "./baseNode";
import { MyIcon } from "lucide-react";

export const MyNewNode = createNode({
  label: "My Node",
  icon: <MyIcon />,
  color: "#your-color",
  fields: [
    {
      name: "myField",
      label: "My Field",
      type: "text",
      defaultValue: "",
    },
  ],
  inputs: [{ id: "input" }],
  outputs: [{ id: "output" }],
});

// 2. Register in your node types configuration
// 3. Import and use in your flow editor
```

### Enabling Variable Support

```javascript
// Just add these flags:
enableVariables: true,
fields: [{
  enableVariables: true,
}]
```

### Enabling Dynamic Size

```javascript
// Just add these flags:
enableDynamicSize: true,
fields: [{
  enableDynamicSize: true,
}]
```

