package com.Wizards.MockTrade.model;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
public class TradeCoinInfo {
    private String name;
    private BigDecimal quantity;
    private BigDecimal price;
}
