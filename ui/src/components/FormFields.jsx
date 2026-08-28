export function InputWithUnit ({ value, unit, onChange, label, type = "number" }) {
    return (
        <label className="form-field">
            {label && <span>{label}</span>}
        
        <div className="input-unit">
            <input
            className="form-control"
            type={type}
            value={value}
            onChange={onChange}
        />

        <span>{unit}</span>
        </div>
        </label>
    );
}

export function InputWithoutUnit ({ label, value, onChange, type = "number" }) {
  return (
    <label className="form-field">
      {label && <span>{label}</span>}

      <input
        className="form-control"
        type={type}
        value={value}
        onChange={onChange}
      />
    </label>
  );
}

export function SelectField({ label, value, options, onChange }) {
  return (
    <label className="form-field">
      {label && <span>{label}</span>}

      <select
        className="form-control"
        value={value}
        onChange={onChange}
      >
        {options.map((option) => (
          <option
            key={option.value ?? option}
            value={option.value ?? option}
          >
            {option.label ?? option}
          </option>
        ))}
      </select>
    </label>
  );
}