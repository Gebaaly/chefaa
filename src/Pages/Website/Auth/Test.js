import { useEffect, useRef, useState } from "react";

export default function Test() {
  const [click, setClick] = useState();
  const count = useRef(0);

  useEffect(() => {
    count.current = count.current+1;
  });

  return (
    <div className="container">
      <h1 className="text-center">Test</h1>

      <input
        type="text"
        name="name"
        placeholder="Enter Your Name"
        value={click}
        required
        onChange={(e) => setClick(e.target.value)}
      />
      <div className="mb-3">{count.current}</div>
    </div>
  );
}
