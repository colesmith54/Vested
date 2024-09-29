import { Gauge } from "gaugejs";
import React, { useEffect, useRef } from "react";

interface GaugeComponentProps {
  value: number;
}

const GaugeComponent: React.FC<GaugeComponentProps> = ({ value }) => {
  const gaugeRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const opts = {
      angle: 0.15, // The span of the gauge arc
      lineWidth: 0.2, // The line thickness
      radiusScale: 1, // Relative radius
      pointer: {
        length: 0.6, // Relative to gauge radius
        strokeWidth: 0.04, // The thickness
        color: "#000000", // Fill color
      },
      limitMax: true,
      limitMin: true,
      colorStart: "#6F6EA0",
      colorStop: "#C0C0DB",
      strokeColor: "#EEEEEE",
      generateGradient: true,
      highDpiSupport: true,
    };

    const target = gaugeRef.current;
    if (target) {
      const gauge = new Gauge(target).setOptions(opts);
      gauge.maxValue = 10;
      gauge.setMinValue(0);
      gauge.animationSpeed = 32;
      gauge.set(value);
    }
  }, [value]);

  return (
    <div style={{ width: "240px", height: "160px", margin: "auto" }}>
      <canvas ref={gaugeRef} width="240" height="160"></canvas>
    </div>
  );
};

export default GaugeComponent;
