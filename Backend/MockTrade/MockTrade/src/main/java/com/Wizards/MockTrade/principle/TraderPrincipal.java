package com.Wizards.MockTrade.principle;

import com.Wizards.MockTrade.model.Trader;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;


public class TraderPrincipal implements UserDetails {
    private Trader trader;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singleton(new SimpleGrantedAuthority("ROLE_" + trader.getRole()));
    }

    public TraderPrincipal(Trader trader) {
        this.trader = trader;
    }

    @Override
    public String getPassword() {
        return trader.getPassword();
    }

    @Override
    public String getUsername() {
        return trader.getUsername();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
