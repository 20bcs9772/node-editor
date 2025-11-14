export const DraggableNode = ({ type, label, color = "#00d9ff" }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType }
    event.target.style.cursor = "grabbing"
    event.dataTransfer.setData("application/reactflow", JSON.stringify(appData))
    event.dataTransfer.effectAllowed = "move"
  }

  return (
    <div
      className={`draggable-node ${type}`}
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = "grab")}
      style={{
        cursor: "grab",
        minWidth: "100%",
        height: "48px",
        display: "flex",
        alignItems: "center",
        borderRadius: "8px",
        backgroundColor: color + "15",
        justifyContent: "center",
        flexDirection: "column",
        padding: "0 12px",
        border: `1.5px solid ${color}40`,
        transition: "all 0.2s ease",
        position: "relative",
        overflow: "hidden",
      }}
      draggable
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = color + "25"
        e.currentTarget.style.borderColor = color + "80"
        e.currentTarget.style.boxShadow = `0 0 12px ${color}40`
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = color + "15"
        e.currentTarget.style.borderColor = color + "40"
        e.currentTarget.style.boxShadow = "none"
      }}
    >
      <span
        style={{
          color: color,
          fontSize: "0.9rem",
          fontWeight: "600",
          letterSpacing: "0.3px",
        }}
      >
        {label}
      </span>
    </div>
  )
}
