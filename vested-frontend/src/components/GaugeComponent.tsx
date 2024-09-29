// src/components/GaugeComponent.tsx
import { Gauge } from 'gaugejs';
import React, { useEffect, useRef } from 'react';
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
        color: '#000000' // Fill color
      },
      limitMax: true,   // If false, the max value of the gauge will be updated if value surpass max
      limitMin: true,   // If true, the min value of the gauge will be fixed
      colorStart: '#6F6EA0',   // Colors
      colorStop: '#C0C0DB',    // just experiment with them
      strokeColor: '#EEEEEE',  // to see which ones work best for you
      generateGradient: true,
      highDpiSupport: true,    // High resolution support
    };

    const target = gaugeRef.current; // Get the reference to the canvas element
    if (target) {
      const gauge = new Gauge(target).setOptions(opts); // Create the gauge
      gauge.maxValue = 10; // Set the max value
      gauge.setMinValue(0); // Set the min value
      gauge.animationSpeed = 32; // Set animation speed (32 is default value)
      gauge.set(value); // Set the initial value
    }
  }, [value]);

  return (
    <div style={{ width: '200px', height: '160px', margin: 'auto' }}>
      <canvas ref={gaugeRef} style={{ width: '100%', height: '100%' }}></canvas>
    </div>
  );
};

export default GaugeComponent;
