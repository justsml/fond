export const enum SIZEOF
{
  FLOAT = 4,
  FLOAT32 = 4,
  FLOAT64 = 8,
}

export function getFile (filename : string)
: Promise<string>
{
  return fetch(filename)
    .then((response) => response.text())
}

export function getImage (filename : string)
: Promise<HTMLImageElement>
{
  const image = new Image();
  image.src = filename
  return new Promise((resolve, reject) => {
    image.addEventListener("load", function () {
      resolve(image)
    })
    image.addEventListener("error", reject)
  })
}

export function createShader(gl : WebGL2RenderingContext, type : number, source : string)
: WebGLShader
{
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (success) {
    return shader;
  }

  console.log(gl.getShaderInfoLog(shader));
  gl.deleteShader(shader);
}

export function createProgram(gl : WebGL2RenderingContext, vertexShader : WebGLShader, fragmentShader : WebGLShader)
: WebGLProgram
{
  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  const success = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (success) {
    return program;
  }

  console.log(gl.getProgramInfoLog(program));
  gl.deleteProgram(program);
}
