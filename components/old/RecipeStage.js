import React, { useState } from "react";

export default function RecipeStage(props) {
  const [test, setTest] = useState();
  return (
    <div className="">
      <input
        placeholder="stage 1 title"
        onChange={(e) => setTest(e.target.value)}
      />
      <textarea placeholder="ingredients" />
      <textarea placeholder="preparing" />
    </div>
  );
}
