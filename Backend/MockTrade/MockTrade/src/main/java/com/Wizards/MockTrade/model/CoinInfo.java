package com.Wizards.MockTrade.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.bson.codecs.BigDecimalCodec;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
public class CoinInfo {
    private String name;
    private BigDecimal quantity;
    private BigDecimal averageBuyPrice;
    private BigDecimal investedAmount;
}
