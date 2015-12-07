module.exports = {
	development : {
		app : {
			name : 'Passport SAML strategy example',
			port : process.env.PORT || 8080
		},
		passport: {
			strategy : 'saml',
			saml : {
				path : '/login/callback',
				entryPoint : 'https://secure.mashery.com/login/demo3.mashery.com',
				issuer : 'demo3.mashery.com'
			}
		}
	}
}
