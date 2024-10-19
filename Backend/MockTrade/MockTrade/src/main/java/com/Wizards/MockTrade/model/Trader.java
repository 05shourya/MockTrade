package com.Wizards.MockTrade.model;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "Traders")
public class Trader {

    @Id
    private String id;
    private String username;
    private String password;
    private List<CoinInfo> coins = new ArrayList<>();
    private Long balance = 0L;
    private Role role = Role.valueOf("USER");
}
