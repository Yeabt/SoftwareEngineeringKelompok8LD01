export default function ForecastTable({ data }) {
  return (
    <table border="1" cellPadding="10" style={{ width: '100%', textAlign: 'left' }}>
      <thead>
        <tr>
          <th>Category</th>
          <th>Forecast (Next Month)</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(data).map(([cat, value]) => (
          <tr key={cat}>
            <td>{cat}</td>
            <td>{value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}