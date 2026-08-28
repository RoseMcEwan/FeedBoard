import { InputWithoutUnit, SelectField } from "../../../components/FormFields.jsx";

export default function PaddocksTable({ paddocks, herds, onChange }) {
  const categoryOptions = ["Pasture", "Young Grass", "Crop", "Silage"];

  const herdOptions = herds.map((herd) => ({
    value: herd.id,
    label: herd.name,
  }));

  return (
    <table className="table paddock-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Category</th>
          <th>Herd</th>
          <th>Hectares</th>
        </tr>
      </thead>

      <tbody>
        {paddocks.map((paddock) => (
          <tr key={paddock.id}>
            <td>
              <InputWithoutUnit
                type="text"
                value={paddock.name}
                onChange={(event) =>
                  onChange(paddock.id, "name", event.target.value)
                }
              />
            </td>

            <td>
              <SelectField
                value={paddock.category}
                options={categoryOptions}
                onChange={(event) =>
                  onChange(paddock.id, "category", event.target.value)
                }
              />
            </td>

            <td>
              <SelectField
                value={paddock.herdId}
                options={herdOptions}
                onChange={(event) =>
                  onChange(paddock.id, "herdId", event.target.value)
                }
              />
            </td>

            <td>
              <InputWithoutUnit
                value={paddock.hectares}
                step="0.1"
                onChange={(event) =>
                  onChange(paddock.id, "hectares", event.target.value)
                }
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
