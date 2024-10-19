package com.Wizards.MockTrade.controller;
import com.Wizards.MockTrade.model.Role;
import com.Wizards.MockTrade.model.Trader;
import com.Wizards.MockTrade.service.TraderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("admin")
public class AdminController {

    @Autowired
    TraderService traderService;

    @PostMapping("/register")
    public ResponseEntity<?> registerTrader(@RequestBody Trader trader){
        trader.setRole(Role.valueOf("ADMIN"));
        return traderService.saveTrader(trader);
    }

    @GetMapping("/traders")
    public List<Trader> showTraders(){
        return traderService.showTraders();
    }

    @GetMapping("/trader/{username}")
    public UserDetails loadByUsername(@PathVariable("username") String username ){
        return traderService.loadUserByUsername(username);
    }
}
