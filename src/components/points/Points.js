import React, { useState, useEffect } from "react";

const Points = ({ points }) => {
  const [bobbing, setBobbing] = useState("bobbing-off");

  useEffect(() => {
    setBobbing("bobbing");

    setTimeout(() => {
      setBobbing("bobbing-off");
    }, 100);
  }, [points]);

  return (
    <div className="text-center points">
      <div className={`${bobbing} bg-light points-bobber`}>{points} Punkte</div>
    </div>
  );
};

export default Points;
