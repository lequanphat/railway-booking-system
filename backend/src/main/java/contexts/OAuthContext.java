package contexts;

import com.backend.railwaybookingsystem.dtos.auth.response.OAuthUser;
import com.backend.railwaybookingsystem.strategies.OAuthStrategy;

public class OAuthContext {
    private final OAuthStrategy oAuthStrategy;

    public OAuthContext(OAuthStrategy oAuthStrategy) {
        this.oAuthStrategy = oAuthStrategy;
    }

    public OAuthUser authenticate(String credential) {
        return oAuthStrategy.authenticate(credential);
    }
}