const MakeTemplate = (otp) => {
  return `<html lang="en">
<head>

    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 20px;
        }
        .container {
            max-width: 600px;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }
        .otp {
            font-size: 24px;
            font-weight: bold;
            color: #333333;
            margin: 20px 0;
        }
        .button {
            display: inline-block;
            padding: 10px 20px;
            font-size: 16px;
            color: #ffffff;
            background-color: #007bff;
            text-decoration: none;
            border-radius: 5px;
            transition: background-color 0.3s;
        }
        .button:hover {
            background-color: #0056b3;
        }
        .footer {
            margin-top: 20px;
            font-size: 12px;
            color: #666666;
        }
    </style>
</head>
<body>

<div class="container">
    <h2>Hello ,</h2>
    <p>Thank you for your request. To proceed with your verification, please use the following One-Time Password (OTP):</p>

    <div class="otp">${otp}</div>

    <p> Please enter it on the verification page.</p>

    <a href="[Your Verification Link]" class="button">Verify Now</a>

    <p class="footer">If you did not request this OTP, please ignore this email.</p>
</div>

</body>
</html>`;
};

module.exports = { MakeTemplate };
