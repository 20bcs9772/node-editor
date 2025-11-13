import "./submit.css"

export const SubmitButton = () => {
  return (
    <div className="submit-container">
      <button type="submit" className="submit-button">
        <span className="submit-icon">▶</span>
        <span className="submit-text">Execute Pipeline</span>
      </button>
    </div>
  )
}
