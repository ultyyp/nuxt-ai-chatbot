// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	css: ['~/assets/css/main.css'],
	runtimeConfig: {
		OPENROUTER_API_KEY: process.env.OPENROUTER_API_KEY
	},
	postcss: {
		plugins: {
			tailwindcss: {},
			autoprefixer: {}
		}
	}
});
