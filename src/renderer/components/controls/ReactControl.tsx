// src/components/controls/ReactControl.tsx
import React from 'react'

interface ControlProps {
  control: ControlSpec
  value: any
  onChange: (value: any) => void
}

export const ReactControl: React.FC<ControlProps> = ({ control, value, onChange }) => {
  switch (control.type) {
    case 'slider':
      return (
        <div className="control-slider">
          <label>{control.label}</label>
          <input 
            type="range" 
            min={control.props?.min || 0}
            max={control.props?.max || 1}
            value={value}
            onChange={(e) => onChange(parseFloat(e.target.value))}
          />
        </div>
      )
      
    case 'toggle':
      return (
        <div className="control-toggle">
          <label>{control.label}</label>
          <input 
            type="checkbox" 
            checked={value}
            onChange={(e) => onChange(e.target.checked)}
          />
        </div>
      )
      
    case 'select':
      return (
        <div className="control-select">
          <label>{control.label}</label>
          <select value={value} onChange={(e) => onChange(e.target.value)}>
            {control.props?.options?.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      )
      
    default:
      return <div className="control-default">{control.label}</div>
  }
}

// Dummy type definitions
interface ControlSpec {
  id: string
  type: string
  label: string
  default?: unknown
  props?: Record<string, unknown>
}