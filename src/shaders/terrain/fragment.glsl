varying float w;

void main() 
{
	vec3 blue = vec3(0.0, 0.0, 1.0); // Blue color for deepest depth, -11033.76m
	vec3 red = vec3(1.0, 0.0, 0.0); // Red color for highest height, 8849m

	gl_FragColor = vec4(mix(blue, red, w).rgb, 1.0);
} 