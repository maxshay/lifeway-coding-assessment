const ResultsTable = ({ searchResults, setCharacterProfile }) => {
  return (
    <div className="mx-4">
      <table className="border-collapse table-auto w-full text-sm">
        <thead>
          <tr className="border bg-gray-200">
            <th className="text-left px-1">Name</th>
            <th className="text-left px-1">Height</th>
            <th className="text-left px-1">Year</th>
            <th className="text-left px-1"></th>
          </tr>
        </thead>
        <tbody>
          {searchResults.map((r) => (
            <tr key={r.name} className="border-b">
              <td className="px-1">{r.name}</td>
              <td className="px-1">{r.height}</td>
              <td className="px-1">{r.birth_year}</td>
              <td className="px-1">
                <button
                  className="hover:underline"
                  onClick={() => setCharacterProfile(r.name)}
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResultsTable;
