package com.Wizards.MockTrade.model;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class TraderDTO {
    private String id;
    private String username;
    private List<CoinInfo> coins = new ArrayList<>();
    private Long balance = 0L;

    public TraderDTO(Trader trader){
        this.id = trader.getId();
        this.username = trader.getUsername();
        this.coins = trader.getCoins();
        this.balance = trader.getBalance();
    }

}
