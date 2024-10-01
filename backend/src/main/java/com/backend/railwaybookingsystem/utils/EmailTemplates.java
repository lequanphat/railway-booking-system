package com.backend.railwaybookingsystem.utils;

public final class EmailTemplates {
    public static String ACCOUNT_VERIFICATION(String link) {
        return "<h1>Email Verification</h1>" +
                "<p>Please click the following link to verify your account</p>" +
                "<a href=\"" + link + "\" style=\"display: inline-block; padding: 10px 20px; " +
                "background-color: #28a745; color: white; text-decoration: none; border-radius: 5px;\">Verify Now</a>";
    }
}
