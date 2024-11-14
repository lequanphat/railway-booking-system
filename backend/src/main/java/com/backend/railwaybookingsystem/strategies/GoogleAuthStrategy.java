package com.backend.railwaybookingsystem.strategies;

import com.backend.railwaybookingsystem.dtos.auth.response.GoogleUserInfo;
import com.backend.railwaybookingsystem.dtos.auth.response.OAuthUser;
import com.backend.railwaybookingsystem.enums.AuthProvider;
import com.backend.railwaybookingsystem.enums.UserRole;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
@Slf4j
public class GoogleAuthStrategy implements OAuthStrategy {


    @Override
    public OAuthUser authenticate(String credential) {
        RestTemplate restTemplate = new RestTemplate();
        String url = "https://oauth2.googleapis.com/tokeninfo?id_token=" + credential;
        GoogleUserInfo googleUserInfo = restTemplate.getForObject(url, GoogleUserInfo.class);

        assert googleUserInfo != null;
        return new OAuthUser(googleUserInfo.getName(), googleUserInfo.getEmail(), googleUserInfo.getPicture(), UserRole.USER, AuthProvider.GOOGLE);

    }
}

