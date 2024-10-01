package com.backend.railwaybookingsystem.utils;

import java.security.SecureRandom;

public final class Generator {
    private static final SecureRandom secureRandom = new SecureRandom();

    public static String generateOtp(int length) {
        StringBuilder otp = new StringBuilder(length);
        for (int i = 0; i < length; i++) {
            otp.append(secureRandom.nextInt(10));
        }
        return otp.toString();
    }
}
