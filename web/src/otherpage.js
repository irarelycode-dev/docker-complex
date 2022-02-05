import React from "react";
import { Link } from "react-router-dom";

function otherpage() {
  return (
    <div>
      I'm on some other page
      <Link to="/">Go back</Link>
    </div>
  );
}

export default otherpage;
