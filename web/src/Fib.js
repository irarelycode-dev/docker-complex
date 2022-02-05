import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";

function Fib() {
  const [indices, setIndices] = useState({
    seenIndices: [],
    values: [],
    index: "",
  });

  const fetchValues = async () => {
    const res = await axios.get("/api/values/current");
    return res.data;
  };

  const fetchIndices = async () => {
    const res = await axios.get("/api/values/all");
    return res.data || [];
  };

  useEffect(() => {
    (async () => {
      const valuesRes = await fetchValues();
      const indicesRes = await fetchIndices();
      let tmpIndices = {
        ...indices,
        values: [...indices.values, valuesRes],
        seenIndices: indicesRes,
      };
      setIndices(tmpIndices);
    })();
  }, []);

  const renderSeenIndices = () => {
    return (
      <ul>
        {indices.seenIndices.map(({ index, _id }) => (
          <li key={_id}>{index}</li>
        ))}
      </ul>
    );
  };

  const renderValues = () => {
    return indices.seenIndices.map((value, idx) => (
      <div key={idx}>
        for index:{idx + 1}, I Calculated {indices.values[0][idx]}
      </div>
    ));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("/api/values", {
      index: indices.index,
    });
    setIndices({ ...indices, index: "" });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>enter your index</label>
        <input
          type="text"
          value={indices.index}
          onChange={(event) =>
            setIndices({ ...indices, index: event.target.value })
          }
        />
        <button>submit</button>
      </form>
      <h3>Indices I have seen</h3>
      {renderSeenIndices()}
      <h3>Calculated Values:</h3>
      {renderValues()}
    </div>
  );
}

export default Fib;
