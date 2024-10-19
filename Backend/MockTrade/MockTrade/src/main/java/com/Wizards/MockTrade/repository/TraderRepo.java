package com.Wizards.MockTrade.repository;


import com.Wizards.MockTrade.model.Trader;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TraderRepo extends MongoRepository<Trader, String>  {
    Trader findByUsername(String username);
}
