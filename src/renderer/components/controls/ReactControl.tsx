// src/renderer/components/controls/ReactControl.tsx
import React from 'react'

interface ControlProps {
  control: ControlSpec
  value: any
  onChange: (value: any) => void
}

export const ReactControl: React.FC<ControlProps> = ({ control, value, onChange }) => {
  const { type, label, props = {} } = control

  switch (type) {
    case 'slider':
      return (
        <div className="control-slider">
          <label>{label}</label>
          <input
            type="range"
            min={props.min ?? 0}
            max={props.max ?? 1}
            step={props.step ?? 0.01}
            value={value}
            onChange={(e) => onChange(parseFloat(e.target.value))}
          />
        </div>
      )

    case 'toggle':
      return (
        <div className="control-toggle">
          <label>{label}</label>
          <input
            type="checkbox"
            checked={!!value}
            onChange={(e) => onChange(e.target.checked)}
          />
        </div>
      )

    case 'select':
      return (
        <div className="control-select">
          <label>{label}</label>
          <select value={value} onChange={(e) => onChange(e.target.value)}>
            {props.options?.map((opt: any) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      )

    default:
      return <div className="control-default">{label}</div>
  }
}

// Dummy type definition – replace with real one
interface ControlSpec {
  id: string
  type: string
  label: string
  default?: any
  props?: Record<string, any>
}
