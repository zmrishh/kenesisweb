import VariableFontHoverByLetter from "../fancy/components/text/variable-font-hover-by-letter"
import "./Roles.css"

interface RolesProps {
  onBack: () => void;
  onApply: () => void;
}

export default function Roles({ onBack, onApply }: RolesProps) {
  return (
    <div className="roles-container">
      <button className="back-button" onClick={onBack}>
        ← Back
      </button>
      <div className="roles-content">
        <div className="roles-wrapper">
          <div className="roles-list">
            <h2 className="roles-title">THE ROLES ✽</h2>
            <div className="roles-section">
              <ul className="roles-items">
                <li>
                  <VariableFontHoverByLetter
                    label="DESIGN ENGINEER"
                    staggerDuration={0.03}
                    fromFontVariationSettings="'wght' 400, 'slnt' 0"
                    toFontVariationSettings="'wght' 900, 'slnt' -10"
                    className="role-item"
                  />
                </li>
                <li>
                  <VariableFontHoverByLetter
                    label="PRODUCT DESIGNER"
                    staggerDuration={0.0}
                    transition={{ duration: 1, type: "spring" }}
                    fromFontVariationSettings="'wght' 400, 'slnt' -10"
                    toFontVariationSettings="'wght' 900, 'slnt' -10"
                    className="role-item"
                  />
                </li>
                <li>
                  <VariableFontHoverByLetter
                    label="ENGINEERING MANAGER"
                    fromFontVariationSettings="'wght' 400, 'slnt' 0"
                    toFontVariationSettings="'wght' 900, 'slnt' -10"
                    staggerFrom="last"
                    className="role-item"
                  />
                </li>
                <li>
                  <VariableFontHoverByLetter
                    label="SALES ENGINEER"
                    staggerFrom="center"
                    fromFontVariationSettings="'wght' 400, 'slnt' 0"
                    toFontVariationSettings="'wght' 900, 'slnt' -10"
                    className="role-item"
                  />
                </li>
              </ul>
              <button className="btn btn-solid apply-button" onClick={onApply}>Apply →</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
