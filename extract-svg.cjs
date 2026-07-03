const fs = require('fs');

const path = 'c:/Users/w5677/OneDrive/Desktop/chara svg/index.html';
const html = fs.readFileSync(path, 'utf8');
const svgMatch = html.match(/<svg[\s\S]*?<\/svg>/);

if (svgMatch) {
  let svgContent = svgMatch[0]
    .replace(/class="/g, 'className="')
    .replace(/<svg /, '<svg ref={svgRef} className="is-active" ')
    .replace(/style="([^"]*)"/g, (m, p1) => {
      const styles = p1.split(';').filter(s => s.trim()).reduce((acc, s) => {
        let [k, v] = s.split(':');
        k = k.trim().replace(/-([a-z])/g, g => g[1].toUpperCase());
        acc[k] = v.trim();
        return acc;
      }, {});
      return `style={${JSON.stringify(styles)}}`;
    })
    .replace(/version="1\.1"/g, 'version="1.1"')
    .replace(/xmlns="([^"]*)"/g, 'xmlns="$1"')
    .replace(/xmlns:xlink="([^"]*)"/g, 'xmlnsXlink="$1"')
    .replace(/xml:space="([^"]*)"/g, 'xmlSpace="$1"')
    .replace(/preserveAspectRatio="([^"]*)"/g, 'preserveAspectRatio="$1"')
    .replace(/viewBox="([^"]*)"/g, 'viewBox="$1"')
    .replace(/stop-opacity/g, 'stopOpacity')
    .replace(/stop-color/g, 'stopColor')
    .replace(/gradientUnits/g, 'gradientUnits') // already camelCase but just to be sure SVG attr might not be. wait gradientUnits is valid JSX
    .replace(/vector-effect/g, 'vectorEffect')
    .replace(/stroke-width/g, 'strokeWidth')
    .replace(/stroke-linecap/g, 'strokeLinecap')
    .replace(/stroke-linejoin/g, 'strokeLinejoin')
    .replace(/stroke-miterlimit/g, 'strokeMiterlimit')
    .replace(/stroke-dasharray/g, 'strokeDasharray')
    .replace(/stroke-dashoffset/g, 'strokeDashoffset')
    .replace(/stroke-opacity/g, 'strokeOpacity')
    .replace(/fill-opacity/g, 'fillOpacity')
    .replace(/fill-rule/g, 'fillRule')
    .replace(/clip-path/g, 'clipPath')
    .replace(/clip-rule/g, 'clipRule')
    .replace(/font-family/g, 'fontFamily')
    .replace(/font-size/g, 'fontSize')
    .replace(/font-weight/g, 'fontWeight')
    .replace(/text-anchor/g, 'textAnchor')
    .replace(/dominant-baseline/g, 'dominantBaseline');

  const jsxContent = `import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { DrawSVGPlugin } from 'gsap-trial/DrawSVGPlugin';

gsap.registerPlugin(DrawSVGPlugin);

export default function CharaSvg() {
  const svgRef = useRef(null);
  const tl = useRef(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    let paths = Array.from(svg.querySelectorAll('path, circle, rect, polygon, polyline, ellipse, line'));
    paths = paths.filter(p => !p.closest('defs'));

    paths.sort((a, b) => {
      try {
        const aBox = a.getBBox();
        const bBox = b.getBBox();
        return (bBox.y + bBox.height) - (aBox.y + aBox.height);
      } catch (e) {
        return 0;
      }
    });

    paths.forEach((p) => {
      const fill = p.getAttribute('fill') || '#000';
      p.dataset.fill = fill;
      p.style.fill = fill;
      p.style.fillOpacity = 0;
      p.style.stroke = fill;
      p.style.strokeWidth = '2';
      p.style.strokeLinecap = 'round';
      p.style.strokeLinejoin = 'round';
    });

    gsap.set(paths, { 
      drawSVG: 0,
      x: 'random(-200, 200)',
      y: 'random(-200, 200)',
      opacity: 0
    });

    const staggerAmount = Math.min(0.08, 3 / paths.length);

    tl.current = gsap.timeline({ repeat: -1 });
    
    const slideTl = gsap.timeline({ defaults: { duration: 1, ease: 'none' } });
    
    slideTl
      .to(paths, { 
        drawSVG: '100%', 
        x: 0,
        y: 0,
        opacity: 1,
        ease: 'power2.out',
        stagger: staggerAmount 
      }, 0)
      .to(paths, { duration: 0.5, fillOpacity: 1, strokeOpacity: 0, stagger: staggerAmount }, '<20%')
      .to(paths, {
        duration: 1,
        drawSVG: 0,
        x: 'random(-200, 200)',
        y: 'random(-200, 200)',
        opacity: 0,
        fillOpacity: 0,
        ease: 'power2.in',
        stagger: staggerAmount
      }, '+=3.5'); // wait longer before resetting

    tl.current.add(slideTl);

    return () => {
      tl.current.kill();
    };
  }, []);

  return (
    <div className="chara-animation-container" style={{ width: '100%', height: '100%', position: 'relative' }}>
      ${svgContent}
    </div>
  );
}
`;

  fs.writeFileSync('d:/Web/web page/iqraWebPage/src/components/CharaSvg.jsx', jsxContent);
  console.log('DONE');
} else {
  console.log('SVG NOT FOUND');
}
