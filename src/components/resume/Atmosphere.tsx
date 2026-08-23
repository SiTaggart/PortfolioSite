import { clampGamut, converter, formatHex, parse } from 'culori';
import { type ReactElement, useEffect, useRef } from 'react';

const toRgb = converter('rgb');
const clampSrgb = clampGamut('rgb');

function readThemeRgb(token: '--background' | '--primary' | '--wash') {
  const probe = document.createElement('span');

  probe.style.color = `var(${token})`;
  document.body.append(probe);

  const parsed = parse(getComputedStyle(probe).color);

  probe.remove();

  if (parsed === undefined) {
    return undefined;
  }

  const rgb = toRgb(clampSrgb(parsed) ?? parsed);

  return [rgb.r, rgb.g, rgb.b] as const;
}

const vertexSource = `
attribute vec2 a_pos;
void main() {
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`;

const fragmentSource = `
precision highp float;

uniform vec2 u_res;
uniform float u_time;
uniform vec3 u_paper;
uniform vec3 u_ink;
uniform vec3 u_wash;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

void main() {
  vec2 p = (gl_FragCoord.xy - 0.5 * u_res) / min(u_res.x, u_res.y);
  float column = smoothstep(0.24, 0.82, abs(p.x));
  float cell = max(10.0, min(u_res.x, u_res.y) / 70.0);
  vec2 coord = gl_FragCoord.xy / cell;
  vec2 grid = floor(coord);
  vec2 local = fract(coord);
  float pixel = step(0.2, local.x) * step(0.2, local.y) * step(local.x, 0.8) * step(local.y, 0.8);

  vec2 block3 = floor(grid / 3.0);
  vec2 block5 = floor(grid / 5.0);
  float square = step(0.86, hash(block3 + 11.0));
  float slab = step(0.92, hash(block5 + 29.0));
  float shape = max(square, slab);

  float travel = grid.x * 0.2 + grid.y * 0.12 - u_time * 1.7;
  float wave = pow(0.5 + 0.5 * sin(travel), 2.4);
  float breath = 0.5 + 0.5 * sin(u_time * 0.7 + hash(block3) * 6.2832);
  float idle = 0.03 + 0.05 * hash(grid);
  float pulse = mix(idle, 0.62, wave);
  pulse = mix(pulse, max(pulse, 0.2 + 0.55 * breath), shape);

  vec3 glow = mix(u_wash, u_ink, shape);
  vec3 color = mix(u_paper, glow, pixel * pulse * column);

  gl_FragColor = vec4(color, 1.0);
}
`;

function compileShader(
  gl: WebGLRenderingContext,
  type: number,
  source: string,
): WebGLShader | undefined {
  const shader = gl.createShader(type);

  if (shader === null) {
    return undefined;
  }

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (gl.getShaderParameter(shader, gl.COMPILE_STATUS) !== true) {
    gl.deleteShader(shader);

    return undefined;
  }

  return shader;
}

function createProgram(gl: WebGLRenderingContext): WebGLProgram | undefined {
  const vertex = compileShader(gl, gl.VERTEX_SHADER, vertexSource);
  const fragment = compileShader(gl, gl.FRAGMENT_SHADER, fragmentSource);

  if (vertex === undefined || fragment === undefined) {
    return undefined;
  }

  const program = gl.createProgram();

  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.linkProgram(program);

  if (gl.getProgramParameter(program, gl.LINK_STATUS) !== true) {
    gl.deleteProgram(program);

    return undefined;
  }

  return program;
}

function prefersReducedMotion(): boolean {
  return globalThis.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function Atmosphere(): ReactElement {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (canvas === null) {
      return;
    }

    const gl = canvas.getContext('webgl', { antialias: false, depth: false, stencil: false });

    if (gl === null) {
      return;
    }

    const program = createProgram(gl);

    if (program === undefined) {
      return;
    }

    const position = gl.getAttribLocation(program, 'a_pos');
    const resolution = gl.getUniformLocation(program, 'u_res');
    const time = gl.getUniformLocation(program, 'u_time');
    const paper = gl.getUniformLocation(program, 'u_paper');
    const ink = gl.getUniformLocation(program, 'u_ink');
    const wash = gl.getUniformLocation(program, 'u_wash');
    const buffer = gl.createBuffer();

    if (position < 0) {
      return;
    }

    gl.useProgram(program);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    const applyPalette = (): void => {
      const paperRgb = readThemeRgb('--background');
      const inkRgb = readThemeRgb('--primary');
      const washRgb = readThemeRgb('--wash');

      if (paperRgb !== undefined) {
        gl.uniform3f(paper, paperRgb[0], paperRgb[1], paperRgb[2]);

        const theme = document.querySelector('meta[name="theme-color"]');

        if (theme !== null) {
          theme.setAttribute(
            'content',
            formatHex({ b: paperRgb[2], g: paperRgb[1], mode: 'rgb', r: paperRgb[0] }),
          );
        }
      }

      if (inkRgb !== undefined) {
        gl.uniform3f(ink, inkRgb[0], inkRgb[1], inkRgb[2]);
      }

      if (washRgb !== undefined) {
        gl.uniform3f(wash, washRgb[0], washRgb[1], washRgb[2]);
      }
    };

    const resize = (): void => {
      const ratio = Math.min(globalThis.devicePixelRatio, 1.75);
      const width = Math.max(1, Math.floor(canvas.clientWidth * ratio));
      const height = Math.max(1, Math.floor(canvas.clientHeight * ratio));

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }

      gl.viewport(0, 0, width, height);
      gl.uniform2f(resolution, width, height);
    };

    const draw = (elapsed: number): void => {
      gl.uniform1f(time, elapsed);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    applyPalette();
    resize();
    draw(0);

    const motion = globalThis.matchMedia('(prefers-reduced-motion: reduce)');
    const started = performance.now();
    let frame = 0;

    const tick = (now: number): void => {
      if (document.hidden || prefersReducedMotion()) {
        return;
      }

      draw((now - started) / 1000);
      frame = globalThis.requestAnimationFrame(tick);
    };

    const startLoop = (): void => {
      if (prefersReducedMotion() || document.hidden) {
        return;
      }

      frame = globalThis.requestAnimationFrame(tick);
    };

    const stopLoop = (): void => {
      globalThis.cancelAnimationFrame(frame);
    };

    const onMotion = (): void => {
      stopLoop();
      draw(0);
      startLoop();
    };

    const onVisibility = (): void => {
      stopLoop();
      startLoop();
    };

    motion.addEventListener('change', onMotion);
    globalThis.addEventListener('resize', resize);
    document.addEventListener('visibilitychange', onVisibility);
    startLoop();

    return () => {
      stopLoop();
      motion.removeEventListener('change', onMotion);
      globalThis.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVisibility);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
    };
  }, []);

  return <canvas aria-hidden="true" className="atmosphere" ref={canvasRef} />;
}
