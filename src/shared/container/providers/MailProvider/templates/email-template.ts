export const getTemplate = (token: string) => `
<html>
    <head>
      <title></title>
    </head>
    <body style="background-color:#D1D1D1">
      <div data-role="module-password-recovery" class="module" role="module" data-type="password-recovery" style="color:#444444; font-size:12px; line-height:20px; padding:16px 16px 16px 16px; text-align:Center; font-family:sans-serif;" data-muid="4e838cf3-9892-4a6d-94d6-170e474d21e5">
        <h1 style="margin-bottom:50px;">My Personal Trainer </h1>
            <div style="background-color:white; padding: 1rem;border-radius: 5px;">
	    <h2 style="margin-top:1rem">Password recovery </h2>
                    <p style="margin-top:1rem">Looks like you forgot your password for My Personal Trainer. Use this generated token in the app to reset your password. </p>
			    <strong style="font-size:1.5rem; margin-top:1rem;"> ${token} </strong>
		    <p style="margin-top:1rem">If you didn't request this email, then you can just ignore it.</p>
            </div>
        </p>
      </div>
    </body>
  </html>
`
