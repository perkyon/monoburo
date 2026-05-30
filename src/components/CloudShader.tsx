"use client";

import React, { useEffect, useRef } from "react";

const FRAGMENT_SHADER = `
#ifdef GL_ES
  precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;
uniform vec4 u_colors[2];
uniform float u_speed;
uniform float u_scale; 
uniform float light;
uniform float shadow;
uniform float tint;
uniform float coverage;
uniform float alpha;

const float cloudalpha = 20.;
const mat2 m = mat2( 1.6,  1.2, -1.2,  1.6 );

vec2 hash( vec2 p ) {
    p = vec2(dot(p,vec2(127.1,311.7)), dot(p,vec2(269.5,183.3)));
    return -1.0 + 2.0*fract(sin(p)*43758.5453123);
}

float noise( in vec2 p ) {
    const float K1 = 0.366025404;
    const float K2 = 0.211324865;
    vec2 i = floor(p + (p.x+p.y)*K1);    
    vec2 a = p - i + (i.x+i.y)*K2;
    vec2 o = (a.x>a.y) ? vec2(1.0,0.0) : vec2(0.0,1.0);
    vec2 b = a - o + K2;
    vec2 c = a - 1.0 + 2.0*K2;
    vec3 h = max(0.5-vec3(dot(a,a), dot(b,b), dot(c,c) ), 0.0 );
    vec3 n = h*h*h*h*vec3( dot(a,hash(i+0.0)), dot(b,hash(i+o)), dot(c,hash(i+1.0)));
    return dot(n, vec3(70.0));    
}

float fbm(vec2 n) {
    float total = 0.0, amplitude = 0.1;
    for (int i = 0; i < 7; i++) {
        total += noise(n) * amplitude;
        n = m * n;
        amplitude *= 0.4;
    }
    return total;
}

void main() {
    vec2 p = gl_FragCoord.xy / u_resolution.xy;
    vec2 uv = p*vec2(u_resolution.x/u_resolution.y,1.0);    
    float speed = u_speed * 0.1;
    float time = u_time * speed;
    float scale = (1. - u_scale);
    float q = fbm(uv * scale * 0.5);
    
    float r = 0.0;
    uv *= scale;
    uv -= q - time;
    float weight = 0.8;
    for (int i=0; i<8; i++){
        r += abs(weight*noise( uv ));
        uv = m*uv + time;
        weight *= 0.7;
    }
    
    float f = 0.0;
    uv = p*vec2(u_resolution.x/u_resolution.y,1.0);
    uv *= scale;
    uv -= q - time;
    weight = 0.7;
    for (int i=0; i<8; i++){
        f += weight*noise( uv );
        uv = m*uv + time;
        weight *= 0.6;
    }
    
    f *= r + f;
    
    float c = 0.0;
    time = u_time * speed * 2.0;
    uv = p*vec2(u_resolution.x/u_resolution.y,1.0);
    uv *= scale*2.0;
    uv -= q - time;
    weight = 0.4;
    for (int i=0; i<7; i++){
        c += weight*noise( uv );
        uv = m*uv + time;
        weight *= 0.6;
    }
    
    float c1 = 0.0;
    time = u_time * speed * 3.0;
    uv = p*vec2(u_resolution.x/u_resolution.y,1.0);
    uv *= scale*3.0;
    uv -= q - time;
    weight = 0.4;
    for (int i=0; i<7; i++){
        c1 += abs(weight*noise( uv ));
        uv = m*uv + time;
        weight *= 0.6;
    }
    
    c += c1;
    
    vec4 skycolour = mix(u_colors[1], u_colors[0], p.y);
    vec4 cloudcolour = vec4(1.0, 1.0, 1.0, 1.0) * clamp(((1.0-shadow) + light*c), 0.0, 1.0);
   
    f = coverage + cloudalpha*alpha*f*r;
    
    vec4 result = mix(skycolour, clamp(tint * skycolour + cloudcolour, 0.0, 1.0), clamp(f + c, 0.0, 1.0));
    
    gl_FragColor = result;
}
`;

const VERTEX_SHADER = `
attribute vec2 position;
void main() {
    gl_Position = vec4(position, 0.0, 1.0);
}
`;

export const CloudShader = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl");
    if (!gl) return;

    const createShader = (gl: WebGLRenderingContext, type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const program = gl.createProgram();
    const vs = createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
    const fs = createShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);

    if (!program || !vs || !fs) return;

    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    gl.useProgram(program);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const uniforms = {
      u_resolution: gl.getUniformLocation(program, "u_resolution"),
      u_time: gl.getUniformLocation(program, "u_time"),
      u_colors: gl.getUniformLocation(program, "u_colors"),
      u_speed: gl.getUniformLocation(program, "u_speed"),
      u_scale: gl.getUniformLocation(program, "u_scale"),
      light: gl.getUniformLocation(program, "light"),
      shadow: gl.getUniformLocation(program, "shadow"),
      tint: gl.getUniformLocation(program, "tint"),
      coverage: gl.getUniformLocation(program, "coverage"),
      alpha: gl.getUniformLocation(program, "alpha"),
    };

    const render = (time: number) => {
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uniforms.u_resolution, canvas.width, canvas.height);
      gl.uniform1f(uniforms.u_time, time * 0.001);
      gl.uniform4fv(uniforms.u_colors, new Float32Array([1, 1, 1, 0, 0, 0, 0, 0]));
      gl.uniform1f(uniforms.u_speed, 0.322);
      gl.uniform1f(uniforms.u_scale, 0.0);
      gl.uniform1f(uniforms.light, 0.5);
      gl.uniform1f(uniforms.shadow, 0.5);
      gl.uniform1f(uniforms.tint, 0.596);
      gl.uniform1f(uniforms.coverage, 0.276);
      gl.uniform1f(uniforms.alpha, 1.0);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      requestAnimationFrame(render);
    };

    requestAnimationFrame(render);

    const handleResize = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    };
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full" />;
};


