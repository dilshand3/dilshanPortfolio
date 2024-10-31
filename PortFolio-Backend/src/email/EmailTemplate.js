export const VERIFICATION_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #0b111e; margin: 0; padding: 0; color: #f0f2f4;">
    <div style="max-width: 600px; margin: 0 auto; background-color:#0b111e; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
        <h1 style="color:#a395e9; text-align: center;">Email Verification</h1>
        <p style="color:#f0f2f4; font-size: 16px; line-height: 1.6;">Hello, {{username}}</p>
        <p style="color:#f0f2f4; font-size: 16px; line-height: 1.6;">Thank you for registering with dilshan.d3 To complete your sign-up, please use the verification code below:</p>

        <div style="font-size: 24px; font-weight: bold; color:#a395e9; text-align: center; margin: 20px 0;">{{VERIFICATION_CODE}}</div>

        <p style="color:#f0f2f4; font-size: 16px; line-height: 1.6;">This code will expire in 2 hours. If you did not request this, please ignore this email.</p>
        <p style="text-align: center; margin-top: 20px; font-size: 12px; color:#f0f2f4;">Thank you!<br />Developer Dilshan</p>
    </div>
</body>
</html>
`;
