const userRepository = require('../Repositories/userRepository')
const bcrypt = require('bcrypt');
const {
    passwordResetEmail
} = require('../helper/nodemailer');
const {
    JWT
} = require('../lib/const');
const jwt = require("jsonwebtoken");

const SALT_ROUND = 10;
const upperCaseLetter = /[A-Z]/g;
const numbers = /[0-9]/g;
const addEmail = /[@]/g;
const dotEmail = /[.]/g;
const spacing = /[\s]/g;

class authService {
    static async handleRegister({
        userName,
        email,
        password,
        role,
        pin,
        isActivated
    }) {
        try {
            const validationPasswordUppercas = password.match(upperCaseLetter);
            const validationPasswordNumbers = password.match(numbers);
            const validationPasswordSpacing = password.match(spacing);
            const validationAddEmail = email.match(addEmail);
            const validationDotEmail = email.match(dotEmail);

            if (!email) {
                return {
                    status: false,
                    statusCode: 400,
                    message: "email harus diisi!",
                    data: {
                        registeredUsers: null
                    }
                }
            } else if (!validationAddEmail) {
                return {
                    status: false,
                    statusCode: 400,
                    message: "email harus mengandung @",
                    data: {
                        registeredUsers: null
                    }
                }
            } else if (!validationDotEmail) {
                return {
                    status: false,
                    statusCode: 400,
                    message: "email harus mengandung titik",
                    data: {
                        registeredUsers: null
                    }
                }
            };

            if (!role) {
                return {
                    status: false,
                    statusCode: 400,
                    message: "role harus diisi!",
                    data: {
                        registeredUsers: null
                    }
                }
            };

            if (!pin) {
                return {
                    status: false,
                    statusCode: 400,
                    message: "PIN harus diisi!",
                    data: {
                        registeredUsers: null
                    }
                }
            };

            if (!userName) {
                return {
                    status: false,
                    statusCode: 400,
                    message: "username harus diisi!",
                    data: {
                        registeredUsers: null
                    }
                }
            } else if (userName.length >= 15) {
                return {
                    status: false,
                    statusCode: 400,
                    message: "username maksimal 15 karakter",
                    data: {
                        registeredUsers: null
                    }
                }
            };

            if (!password) {
                return {
                    status: false,
                    statusCode: 400,
                    message: "password harus diisi!",
                    data: {
                        registeredUsers: null
                    }
                }
            } else if (password.length < 8) {
                return {
                    status: false,
                    statusCode: 400,
                    message: "password harus minimal harus 8 karakter!",
                    data: {
                        registeredUsers: null
                    }
                }
            } else if (!validationPasswordUppercas) {
                return {
                    status: false,
                    statusCode: 400,
                    message: "password harus mengandung huruf kapital!",
                    data: {
                        registeredUsers: null
                    }
                }
            } else if (!validationPasswordNumbers) {
                return {
                    status: false,
                    statusCode: 400,
                    message: "password harus mengandung angka!",
                    data: {
                        registeredUsers: null
                    }
                }
            } else if (validationPasswordSpacing) {
                return {
                    status: false,
                    statusCode: 400,
                    message: "password tidak boleh diberi spasi!",
                    data: {
                        registeredUsers: null
                    }
                }
            };

            const getUsersByEmail = await userRepository.handleGetUsersByEmail({
                email: email
            });

            if (getUsersByEmail) {
                return {
                    status: false,
                    statusCode: 400,
                    message: "email sudah terdaftar",
                    data: {
                        registeredUsers: null
                    }
                }
            } else {
                const emailTemplates = {
                    from: 'Test-Bootcamp',
                    to: email,
                    subject: 'Aktivasi akun email anda!',
                    html: `  
                        <body 
                        style="
                            background-color: #F1F6F5;
                        "
                        >
                            <section style="padding: 4% 8%;">
                                
                                <div class="content"
                                    style="
                                    margin: 2% 0 0;
                                    padding:2%; 
                                    justify-content: center;
                                    background-color: #FFFFFF;
                                    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
                                    height: auto;"
                                >
                                    <h2 
                                        style="
                                        color: #000; 
                                        text-decoration: none; 
                                        list-style: none"
                                    > Halo Kak, </h2>
                                    
                                    <p style="text-align: center; font-size: 16px; color: #000; margin-top: 16px;">
                                        Untuk meng aktivasi akun anda, Silahkan salin kode dibawah ini.
                                    </p>
                    
                                    <p  class="otp"
                                        style="
                                        text-align: center; 
                                        font-size: 20px;
                                        padding: 2%;
                                        background-color: #000;
                                        color: #FFF;
                                        font-weight: 700;
                                        width: 30%;
                                        display: block;
                                        margin: 0 auto;
                                        border-radius: 5px;"
                                    >
                                        ${isActivated}
                                    </p>
                                </div>
                            </section>    
                        </body>
                `
                };

                passwordResetEmail(emailTemplates);

                const hashingPassword = await bcrypt.hash(password, SALT_ROUND);
                const registeredUser = await userRepository.handleRegister({
                    userName,
                    email,
                    password: hashingPassword,
                    role,
                    pin,
                    isActivated
                });

                return {
                    status: true,
                    statusCode: 201,
                    message: "akun berhasil dibuat!, Slahkan aktivasi terlebih dahulu dengan mengecek gmail anda.",
                    data: {
                        registeredUsers: registeredUser
                    }
                };
            };

        } catch (e) {
            return {
                status: false,
                statusCode: 400,
                message: e.message,
                data: {
                    registeredUsers: null
                }
            };
        };
    };

    static async handleUpdateIsActivated({
        isActivated,
    }) {
        const getUserData = await userRepository.handleGetUserIsActivated({
            isActivated,
        });

        if (getUserData.isActivated == isActivated) {

            const updateUserPassword = await userRepository.handleUpdateIsActivated({
                isActivated
            });

            return {
                status: true,
                statusCode: 201,
                message: "Akun berhasil di aktivasi!",
                data: {
                    updateUserPassword,
                },
            };
        } else {
            return {
                status: false,
                statusCode: 401,
                message: "Sumber tidak ada.",
                data: {
                    resetPassword: null,
                },
            };
        }
    };

    static async handleLogin({
        email,
        password,
    }) {
        try {
            const validationPasswordUppercas = password.match(upperCaseLetter);
            const validationPasswordNumbers = password.match(numbers);
            const validationPasswordSpacing = password.match(spacing);
            const validationAddEmail = email.match(addEmail);
            const validationDotEmail = email.match(dotEmail);

            if (!email) {
                return {
                    status: false,
                    statusCode: 400,
                    message: "email harus diisi!",
                    data: {
                        registeredUsers: null
                    }
                }
            } else if (!validationAddEmail) {
                return {
                    status: false,
                    statusCode: 400,
                    message: "email harus mengandung @",
                    data: {
                        registeredUsers: null
                    }
                }
            } else if (!validationDotEmail) {
                return {
                    status: false,
                    statusCode: 400,
                    message: "email harus mengandung titik",
                    data: {
                        registeredUsers: null
                    }
                }
            };

            if (!password) {
                return {
                    status: false,
                    statusCode: 400,
                    message: "password harus diisi!",
                    data: {
                        registeredUsers: null
                    }
                }
            } else if (password.length < 8) {
                return {
                    status: false,
                    statusCode: 400,
                    message: "password harus minimal harus 8 karakter!",
                    data: {
                        registeredUsers: null
                    }
                }
            } else if (!validationPasswordUppercas) {
                return {
                    status: false,
                    statusCode: 400,
                    message: "password harus mengandung huruf kapital!",
                    data: {
                        registeredUsers: null
                    }
                }
            } else if (!validationPasswordNumbers) {
                return {
                    status: false,
                    statusCode: 400,
                    message: "password harus mengandung angka!",
                    data: {
                        registeredUsers: null
                    }
                }
            } else if (validationPasswordSpacing) {
                return {
                    status: false,
                    statusCode: 400,
                    message: "password tidak boleh diberi spasi!",
                    data: {
                        registeredUsers: null
                    }
                }
            };

            const getUsersByEmail = await userRepository.handleGetUsersByEmail({
                email
            });

            if (!getUsersByEmail) {
                return {
                    status: false,
                    statusCode: 400,
                    message: "email tidak terdaftar",
                    data: {
                        loginUsers: null
                    }
                }
            };

            if (getUsersByEmail.isActivated === 'berhasil') {
                const isPasswordMatch = await bcrypt.compare(password, getUsersByEmail.password);

                if (isPasswordMatch) {
                    const token = jwt.sign({
                            id: getUsersByEmail.id,
                            email: getUsersByEmail.email
                        },
                        JWT.SECRET, {
                            expiresIn: JWT.EXPIRED,
                        });
                    return {
                        status: true,
                        statusCode: 200,
                        message: "Pengguna berhasil masuk!",
                        data: {
                            token,
                        },
                    };
                } else {
                    return {
                        status: false,
                        statusCode: 400,
                        message: "Password salah!",
                        data: {
                            loginUsers: null,
                        },
                    };
                }
            } else {
                return {
                    status: false,
                    statusCode: 400,
                    message: "akun anda belum di aktivasi!",
                    data: {
                        loginUsers: null
                    }
                };
            }
        } catch (e) {
            return {
                status: false,
                statusCode: 400,
                message: e.message,
                data: {
                    loginUsers: null
                }
            };
        };
    };

    static async handleForgotPassword({
        email,
        otp
    }) {
        try {
            if (!email) {
                return {
                    status: false,
                    statusCode: 400,
                    message: "Email harus diisi!",
                    data: {
                        forgotPassword: null,
                    },
                };
            }

            const getUsersByEmail = await userRepository.handleGetUsersByEmail({
                email: email
            });

            if (!getUsersByEmail) {
                return {
                    status: false,
                    statusCode: 400,
                    message: "Email tidak terdaftar.",
                    data: {
                        forgotPassword: null,
                    },
                };
            } else {
                const emailTemplates = {
                    from: 'Test Bootcamp',
                    to: email,
                    subject: 'konfirmasi reset password kamu',
                    html: `  
                        <body 
                        style="
                            background-color: #F1F6F5;
                        "
                        >
                            <section style="padding: 4% 8%;">
                                
                                <div class="content"
                                    style="
                                    margin: 2% 0 0;
                                    padding:2%; 
                                    justify-content: center;
                                    background-color: #FFFFFF;
                                    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
                                    height: auto;"
                                >
                                    <h2 
                                        style="
                                        color: #000; 
                                        text-decoration: none; 
                                        list-style: none"
                                    > Halo ${getUsersByEmail.email}, </h2>
                                    
                                    <p style="text-align: center; font-size: 16px; color: #000; margin-top: 16px;">
                                        Untuk mengkonfirmasi permintaan reset password akun kamu, silakan salin OTP di bawah ini.
                                    </p>
                    
                                    <p  class="otp"
                                        style="
                                        text-align: center; 
                                        font-size: 20px;
                                        padding: 2%;
                                        background-color: #000;
                                        color: #FFF;
                                        font-weight: 700;
                                        width: 30%;
                                        display: block;
                                        margin: 0 auto;
                                        border-radius: 5px;"
                                    >
                                        ${otp}
                                    </p>

                                    <p  style="text-align: center; font-size: 16px; color: #000;"> 
                                        Jika kamu tidak meminta reset password, silakan abaikan email ini.
                                    </p>
                                </div>
                            </section>    
                        </body>
                `
                };

                passwordResetEmail(emailTemplates);

                const updatedOtp = await userRepository.handleUpdateUserOTP({
                    email,
                    otp
                });

                return {
                    status: true,
                    statusCode: 201,
                    message: "Reset kata sandi dikirim ke email pengguna!",
                    data: {
                        updatedOtp
                    }
                };
            }
        } catch (err) {
            return {
                status: false,
                statusCode: 401,
                message: "Sumber tidak ada.",
                data: {
                    forgotPassword: null,
                },
            };
        }
    };

    static async handleResetPassword({
        otp,
        password
    }) {
        // ------------------------- Payload Validation ------------------------- //
        const passwordUppercase = password.match(upperCaseLetter);
        const passwordNumbers = password.match(numbers);
        const passwordSpacing = password.match(spacing);

        if (!password) {
            return {
                status: false,
                statusCode: 400,
                message: "Password harus diisi.",
                data: {
                    resetPassword: null,
                },
            };
        } else if (password.length < 8) {
            return {
                status: false,
                statusCode: 400,
                message: "Password minimal 8 karakter.",
                data: {
                    resetPassword: null,
                },
            };
        } else if (!passwordUppercase) {
            return {
                status: false,
                statusCode: 400,
                message: "Password harus mengandung huruf besar.",
                data: {
                    resetPassword: null,
                },
            };
        } else if (!passwordNumbers) {
            return {
                status: false,
                statusCode: 400,
                message: "Password harus mengandung angka.",
                data: {
                    resetPassword: null,
                },
            };
        } else if (passwordSpacing) {
            return {
                status: false,
                statusCode: 400,
                message: "Password tidak boleh diberi spasi.",
                data: {
                    resetPassword: null,
                },
            };
        }

        const getUserData = await userRepository.handleGetUserOTP({
            otp,
            password
        });

        if (getUserData.otp == otp) {

            const hashedPassword = await bcrypt.hash(password, SALT_ROUND);

            const updateUserPassword = await userRepository.handleResetPassword({
                otp,
                password: hashedPassword
            });

            return {
                status: true,
                statusCode: 201,
                message: "Pengguna berhasil mengubah kata sandi!",
                data: {
                    updateUserPassword,
                },
            };
        } else {
            return {
                status: false,
                statusCode: 401,
                message: "Sumber tidak ada.",
                data: {
                    resetPassword: null,
                },
            };
        }
    };
};

module.exports = authService;