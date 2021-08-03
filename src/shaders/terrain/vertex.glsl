uniform sampler2D bumpTexture;
uniform float bumpScale;

varying float w;
varying vec2 vUV;

void main() 
{ 
	vUV = uv;
	vec4 bumpData = texture2D( bumpTexture, uv );
	// Because rgb values of texture2D are between 0.0 and 1.0, need to muliply those values by 255.0
	w = ((bumpData.r * 256.0 * 256.0 + bumpData.g * 256.0 + bumpData.b) * 255.0 * 0.1) - 10000.0;
	// Get value between 0.0 and 1.0 by using world's deepest depth and highest height - It's because the maximum height can't be exceed the real world's max height
	w = smoothstep(-11033.76, 8849.0, w);

	// Move the position along the normal
    vec3 newPosition = position + normal * bumpScale * w;
	
	gl_Position = projectionMatrix * modelViewMatrix * vec4( newPosition, 1.0 );
}