const fs = require('fs');

function createSplat(baseR, spikes, seedOffset) {
  const cx = 100;
  const cy = 100;
  let path = '';
  
  // We'll generate a smooth path using a series of cubic beziers.
  // Instead of sharp spikes, we'll create bulbous arms.
  const numPoints = spikes.length;
  const points = [];
  
  for (let i = 0; i < numPoints; i++) {
    const angle = (i / numPoints) * Math.PI * 2 + seedOffset;
    const spikeLength = spikes[i];
    
    // Base point (valley between spikes)
    const bx = cx + baseR * Math.cos(angle - 0.2);
    const by = cy + baseR * Math.sin(angle - 0.2);
    
    // Tip point
    const tx = cx + (baseR + spikeLength) * Math.cos(angle);
    const ty = cy + (baseR + spikeLength) * Math.sin(angle);
    
    // Next base point
    const nx = cx + baseR * Math.cos(angle + 0.2);
    const ny = cy + baseR * Math.sin(angle + 0.2);
    
    points.push({ bx, by, tx, ty, nx, ny });
  }
  
  // Construct path
  path += `M ${points[0].bx.toFixed(1)} ${points[0].by.toFixed(1)} `;
  
  for (let i = 0; i < numPoints; i++) {
    const p = points[i];
    const nextP = points[(i + 1) % numPoints];
    
    // Curve to tip
    // Control points should push outwards to make it bulbous
    const cp1x = p.bx + (p.tx - p.bx) * 0.2;
    const cp1y = p.by + (p.ty - p.by) * 0.2;
    const cp2x = p.tx - (p.tx - cx) * 0.2; // Push outwards relative to center
    const cp2y = p.ty - (p.ty - cy) * 0.2;
    
    // Simplification for bulbous arm:
    // C base_x base_y, tip_x_offset tip_y_offset, tip_x tip_y
    // We'll use a standard formula for a rounded spike.
    path += `C ${p.bx.toFixed(1)} ${p.by.toFixed(1)}, ${p.tx.toFixed(1)} ${p.ty.toFixed(1)}, ${p.tx.toFixed(1)} ${p.ty.toFixed(1)} `;
    path += `C ${p.tx.toFixed(1)} ${p.ty.toFixed(1)}, ${p.nx.toFixed(1)} ${p.ny.toFixed(1)}, ${p.nx.toFixed(1)} ${p.ny.toFixed(1)} `;
    
    // Curve to next base
    path += `C ${p.nx.toFixed(1)} ${p.ny.toFixed(1)}, ${nextP.bx.toFixed(1)} ${nextP.by.toFixed(1)}, ${nextP.bx.toFixed(1)} ${nextP.by.toFixed(1)} `;
  }
  
  path += 'Z';
  return path;
}

// Actually, generating nice svg blobs mathematically is tricky with just simple code.
// Let's use a simpler approach: large center, fixed points.

function generateManualSplat(config) {
   // A simpler way is to hand-craft it using a base circle of R=65 (so diameter is 130).
   // Center is 100,100.
   // Top: 100, 35
   // Right: 165, 100
   // Bottom: 100, 165
   // Left: 35, 100
   
   return config;
}

const SPLATTER_PATHS = [
  // 0. Blue style (Top-Right image) - 7 arms. Base radius ~ 55. Center area has plenty of room.
  'M 100 45 C 115 45, 120 30, 125 10 C 135 -10, 155 10, 140 35 C 135 45, 145 55, 155 50 C 180 40, 195 60, 175 75 C 165 85, 165 95, 175 105 C 195 115, 185 140, 160 135 C 150 130, 140 140, 145 150 C 155 175, 130 195, 115 170 C 105 155, 95 155, 85 170 C 70 195, 45 175, 55 150 C 60 140, 50 130, 40 135 C 15 140, 5 115, 25 105 C 35 95, 35 85, 25 75 C 5 60, 20 40, 45 50 C 55 55, 65 45, 60 35 C 45 10, 65 -10, 75 10 C 80 30, 85 45, 100 45 Z' +
  ' M 25 25 A 6 6 0 1 1 37 25 A 6 6 0 1 1 25 25 M 175 160 A 8 8 0 1 1 191 160 A 8 8 0 1 1 175 160 M 35 165 A 5 5 0 1 1 45 165 A 5 5 0 1 1 35 165',
  
  // 1. Orange style (Bottom-Left image) - Very large round blob with small bumps. Base radius ~ 65.
  'M 100 35 C 120 35, 140 40, 155 55 C 170 70, 170 80, 185 90 C 200 100, 175 130, 160 140 C 150 145, 155 160, 170 170 C 185 180, 160 205, 140 190 C 120 175, 110 165, 90 170 C 70 175, 50 190, 35 170 C 20 150, 40 135, 35 115 C 30 95, 10 90, 15 70 C 20 50, 40 55, 55 45 C 70 35, 80 35, 100 35 Z' + 
  ' M 180 30 A 7 7 0 1 1 194 30 A 7 7 0 1 1 180 30 M 15 140 A 6 6 0 1 1 27 140 A 6 6 0 1 1 15 140 M 150 10 A 5 5 0 1 1 160 10 A 5 5 0 1 1 150 10 M 70 15 A 8 8 0 1 1 86 15 A 8 8 0 1 1 70 15',
  
  // 2. Pink style (Bottom-Right image) - Thick 6 arms, huge center. Base radius ~ 55.
  'M 100 45 C 115 45, 125 35, 135 15 C 150 -10, 175 15, 155 40 C 145 50, 150 60, 165 65 C 190 75, 195 105, 170 110 C 155 115, 150 125, 160 135 C 175 155, 155 185, 135 165 C 125 155, 110 155, 100 165 C 90 175, 95 195, 75 190 C 55 185, 60 160, 70 150 C 80 140, 75 125, 60 120 C 35 110, 30 80, 55 75 C 70 70, 75 60, 65 50 C 50 30, 75 5, 90 25 C 95 35, 90 45, 100 45 Z' +
  ' M 30 160 A 7 7 0 1 1 44 160 A 7 7 0 1 1 30 160 M 175 15 A 6 6 0 1 1 187 15 A 6 6 0 1 1 175 15 M 15 40 A 5 5 0 1 1 25 40 A 5 5 0 1 1 15 40',
  
  // 3. Realistic Orange style (Top-Left image) - Jagged but wide base. Base radius ~ 60.
  'M 100 40 C 120 40, 135 30, 140 15 C 145 -5, 165 5, 155 25 C 150 35, 165 40, 180 35 C 195 30, 195 50, 175 55 C 160 60, 165 75, 180 80 C 195 85, 195 110, 175 110 C 160 110, 155 125, 165 140 C 175 155, 155 175, 140 160 C 130 150, 115 155, 115 170 C 115 190, 90 190, 90 170 C 90 155, 75 150, 65 160 C 50 175, 30 155, 45 140 C 55 125, 50 110, 35 110 C 15 110, 15 85, 35 80 C 50 75, 55 60, 40 55 C 20 50, 20 30, 35 35 C 50 40, 65 35, 60 25 C 55 5, 75 -5, 80 15 C 85 30, 90 40, 100 40 Z' +
  ' M 20 20 A 8 8 0 1 1 36 20 A 8 8 0 1 1 20 20 M 180 160 A 7 7 0 1 1 194 160 A 7 7 0 1 1 180 160 M 20 170 A 6 6 0 1 1 32 170 A 6 6 0 1 1 20 170 M 150 185 A 5 5 0 1 1 160 185 A 5 5 0 1 1 150 185 M 95 15 A 4 4 0 1 1 103 15 A 4 4 0 1 1 95 15'
];

console.log(JSON.stringify(SPLATTER_PATHS, null, 2));
