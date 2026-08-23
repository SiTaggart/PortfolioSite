import { type ReactElement, useEffect, useRef } from 'react';

type Rgb = readonly [number, number, number];

interface Palette {
  ink: Rgb;
  paper: Rgb;
  wash: Rgb;
}

const lightPalette: Palette = {
  ink: [0.106, 0.141, 0.2],
  paper: [0.953, 0.918, 0.847],
  wash: [0.239, 0.427, 0.416],
};

const darkPalette: Palette = {
  ink: [0.847, 0.812, 0.706],
  paper: [0.063, 0.086, 0.122],
  wash: [0.369, 0.659, 0.627],
};

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

float valueNoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

float fbm(vec2 p) {
  float value = 0.0;
  float amplitude = 0.5;
  for (int i = 0; i < 5; i++) {
    value += amplitude * valueNoise(p);
    p = p * 2.03 + vec2(17.2, 9.4);
    amplitude *= 0.5;
  }
  return value;
}

void main() {
  vec2 p = (gl_FragCoord.xy - 0.5 * u_res) / min(u_res.x, u_res.y);
  float time = u_time * 0.016;

  vec2 q = p * 1.25;
  q += 0.22 * vec2(fbm(q + time), fbm(q + 4.2 - time));

  float field = fbm(q * 1.7 + vec2(time * 0.35, -time * 0.22));
  float band = abs(fract(field * 4.2 + time * 0.08) - 0.5);
  float contour = smoothstep(0.18, 0.07, band);

  vec3 color = mix(u_paper, u_wash, 0.16 + 0.32 * field);
  color = mix(color, u_ink, contour * 0.1);

  float falloff = smoothstep(0.2, 1.2, length(p * vec2(0.72, 1.05)));
  color = mix(color, u_paper, falloff * 0.42);

  float grain = hash(gl_FragCoord.xy + vec2(u_time * 60.0, 3.1)) - 0.5;
  color += grain * 0.03;

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

function currentPalette(): Palette {
  return globalThis.matchMedia('(prefers-color-scheme: dark)').matches ? darkPalette : lightPalette;
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
      const palette = currentPalette();
      gl.uniform3f(paper, palette.paper[0], palette.paper[1], palette.paper[2]);
      gl.uniform3f(ink, palette.ink[0], palette.ink[1], palette.ink[2]);
      gl.uniform3f(wash, palette.wash[0], palette.wash[1], palette.wash[2]);
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

    const colorScheme = globalThis.matchMedia('(prefers-color-scheme: dark)');
    const motion = globalThis.matchMedia('(prefers-reduced-motion: reduce)');
    const started = performance.now();
    let frame = 0;

    const onColorScheme = (): void => {
      applyPalette();
      draw((performance.now() - started) / 1000);
    };

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

    colorScheme.addEventListener('change', onColorScheme);
    motion.addEventListener('change', onMotion);
    globalThis.addEventListener('resize', resize);
    document.addEventListener('visibilitychange', onVisibility);
    startLoop();

    return () => {
      stopLoop();
      colorScheme.removeEventListener('change', onColorScheme);
      motion.removeEventListener('change', onMotion);
      globalThis.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVisibility);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
    };
  }, []);

  return <canvas aria-hidden="true" className="atmosphere" ref={canvasRef} />;
}
