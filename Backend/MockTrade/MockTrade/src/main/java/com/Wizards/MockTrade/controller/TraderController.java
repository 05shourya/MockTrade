package com.Wizards.MockTrade.controller;

import com.Wizards.MockTrade.model.*;
import com.Wizards.MockTrade.service.TraderService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/trader")
//@CrossOrigin(origins = "*", allowedHeaders = "*")
public class TraderController {

    @Autowired
    TraderService traderService;

    @PostMapping("/register")
    public ResponseEntity<?> registerTrader(@RequestBody Trader trader){
        trader.setRole(Role.valueOf("USER"));
        return traderService.saveTrader(trader);
    }

    @GetMapping("/validate")
    public Map<String , String> sayHello(Principal principal){
        Map<String,String> res  = new HashMap<>();
        res.put("Message" , "Validated");
        return res;
    }


    @PostMapping("/update/{id}")
    public Trader updateTrader(@PathVariable String id, @RequestBody Trader trader , Principal principal){
        trader.setRole(Role.valueOf("USER"));
        trader.setId(id);
        return traderService.updateTrader(trader , principal);
    }

    @PostMapping("transferCoin")
    public ResponseEntity<String> transferCoin(@RequestBody CoinTransfer coinTransfer, Principal principal){
        return traderService.transferCoin(coinTransfer , principal);
    }

    @GetMapping("/getPrincipal")
    public Principal getPrincipal(Principal principal){
        return principal;
    }

    @GetMapping("/getTrader")
    public TraderDTO getTrader(Principal principal){
        return traderService.getTraderDetails(principal.getName());
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Trader trader , HttpServletResponse response){

        return traderService.verify(trader , response);

    }

    @PostMapping("buyCoin")
    public ResponseEntity<String> buyCoin(@RequestBody TradeCoinInfo coin, Principal principal){

        return traderService.buyCoin(coin , principal);

    }

    @PostMapping("sellCoin")
    public ResponseEntity<String> sellCoin(@RequestBody TradeCoinInfo coin , Principal principal){
        return traderService.sellCoin(coin , principal);
    }

    @PostMapping("addBalance")
    public ResponseEntity<String> addBalance(@RequestBody Long amount, Principal principal){
        return traderService.addBalance(amount, principal);
    }

    @PostMapping("withdrawBalance")
    public ResponseEntity<String> withdrawBalance(@RequestBody Long amount , Principal principal){
        return traderService.withdrawBalance(amount, principal);
    }
}
