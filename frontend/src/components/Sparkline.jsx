import React from "react";
import { Sparklines, SparklinesLine } from "react-sparklines";

export default function Sparkline({ data = [1,2,3,4,5] }) {
  return (
    <div className="sparkline">
      <Sparklines data={data} svgWidth={120} svgHeight={40}>
        <SparklinesLine />
      </Sparklines>
    </div>
  );
}