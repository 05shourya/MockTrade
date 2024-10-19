package com.Wizards.MockTrade.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CoinTransfer {
    private String senderId;
    private String receiverId;
    private List<CoinInfo> coins;
}
