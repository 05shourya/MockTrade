package com.Wizards.MockTrade.service;

import com.Wizards.MockTrade.model.Trader;
import com.Wizards.MockTrade.principle.TraderPrincipal;
import com.Wizards.MockTrade.repository.TraderRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class MyUserDetailService implements UserDetailsService {

    @Autowired
    TraderRepo repo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Trader trader = repo.findByUsername(username);
        if(trader == null){
            return null;
//            throw new UsernameNotFoundException("No Such User");
        }
        return new TraderPrincipal(trader);
    }
}
