import crypto from 'crypto'

export const getResetPasswordToken = (user) => {

    const resetToken = crypto.randomBytes(20).toString("hex")
    // console.log(resetToken);
    user.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex")

    user.resetPasswordExpire = Date.now() + 15*60*1000;

    return resetToken
}
