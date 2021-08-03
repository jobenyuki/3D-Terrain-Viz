uniform sampler2D diffuseTexture;
uniform bool gradientMapping;
uniform bool textureMapping;

varying float w;
varying vec2 vUV;

void main() 
{
	vec3 blue = vec3(0.0, 0.0, 1.0); // Blue color for deepest depth, -11033.76m
	vec3 red = vec3(1.0, 0.0, 0.0); // Red color for highest height, 8849m

	if(gradientMapping && textureMapping) {
		gl_FragColor = vec4((texture2D( diffuseTexture, vUV * 1.0 ).rgb * mix(blue, red, w)).rgb, 1.0);
	} else if(gradientMapping) {
		gl_FragColor = vec4(mix(blue, red, w).rgb, 1.0);
	} else {
		gl_FragColor = texture2D( diffuseTexture, vUV * 1.0 );
	}
} 