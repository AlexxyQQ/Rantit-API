function generateOTP() {
  // Define the character set for your OTP (you can customize this)
  const characters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  let otp = "";

  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    otp += characters.charAt(randomIndex);
  }

  return otp;
}

module.exports = generateOTP;
