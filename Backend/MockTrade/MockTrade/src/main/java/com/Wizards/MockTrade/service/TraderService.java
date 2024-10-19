package com.Wizards.MockTrade.service;
import com.Wizards.MockTrade.model.*;
import com.Wizards.MockTrade.repository.TraderRepo;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.security.Principal;
import java.util.List;
import java.util.Objects;
import java.util.Optional;


@Service
public class TraderService {
    @Autowired
    TraderRepo repo;

    @Autowired
    MyUserDetailService userDetailService;

    @Autowired
    AuthenticationManager authenticationManager ;

    @Autowired
    JwtService jwtService;

    BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

    public ResponseEntity<?> saveTrader(Trader trader){
        if(loadUserByUsername(trader.getUsername()) != null){
            return new ResponseEntity<>("Username already taken" , HttpStatus.BAD_REQUEST);
        }
        trader.setPassword(encoder.encode(trader.getPassword()));
        Trader savedTrader = repo.save(trader);
        return new ResponseEntity<>(savedTrader, HttpStatus.CREATED);
    }

    public List<Trader> showTraders(){
        return repo.findAll();
    }

    public TraderDTO getTraderDetails(String username){
        Trader trader = repo.findByUsername(username);
        return new TraderDTO(trader);
    }

    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userDetailService.loadUserByUsername(username);
    }

    public Trader updateTrader(Trader trader , Principal principal) {

        if(!Objects.equals(principal.getName(), trader.getUsername())){
            throw new SecurityException("Unauthorized action: The provided credentials do not match the trader's username.");

        }

        Trader existingTrader = repo.findById(trader.getId())
                .orElseThrow(() -> new RuntimeException("Trader not found with ID: " + trader.getId()));

        existingTrader.setUsername(trader.getUsername());
        existingTrader.setPassword(trader.getPassword());
        existingTrader.setCoins(trader.getCoins());
        existingTrader.setBalance(trader.getBalance());
        existingTrader.setRole(trader.getRole());

        return repo.save(existingTrader);

    }

    public ResponseEntity<String> transferCoin(CoinTransfer coinTransfer, Principal principal) {
        String authenticatedUsername = principal.getName();
        Trader authenticatedTrader = repo.findByUsername(authenticatedUsername);

        if (!authenticatedTrader.getId().equals(coinTransfer.getSenderId())) {
            return new ResponseEntity<>("You are not authorized to transfer coins on behalf of this user.", HttpStatus.FORBIDDEN);
        }

        Trader sender = repo.findById(coinTransfer.getSenderId())
                .orElseThrow(() -> new RuntimeException("Trader not found with ID: " + coinTransfer.getSenderId()));

        Trader receiver = repo.findById(coinTransfer.getReceiverId())
                .orElseThrow(() -> new RuntimeException("Trader not found with ID: " + coinTransfer.getReceiverId()));

        List<CoinInfo> senderCoins = sender.getCoins();
        List<CoinInfo> receiverCoins = receiver.getCoins();

        BigDecimal totalInvestedAmountTransferred = BigDecimal.ZERO;

        for (CoinInfo transferCoin : coinTransfer.getCoins()) {
            CoinInfo senderCoin = findCoin(senderCoins, transferCoin.getName());

            if (senderCoin == null) {
                return new ResponseEntity<>("Sender does not own the coin: " + transferCoin.getName(), HttpStatus.BAD_REQUEST);
            }

            if (senderCoin.getQuantity().compareTo(transferCoin.getQuantity()) < 0) {
                return new ResponseEntity<>("Sender does not have enough of the coin: " + transferCoin.getName(), HttpStatus.BAD_REQUEST);
            }

            // Calculate the invested amount that corresponds to the quantity being transferred
            BigDecimal totalInvestedAmount = senderCoin.getInvestedAmount();
            BigDecimal quantityToTransfer = transferCoin.getQuantity();
            BigDecimal currentQuantity = senderCoin.getQuantity();

            // Calculate the invested amount for the quantity being transferred
            BigDecimal investedAmountForTransferredQuantity = totalInvestedAmount
                    .divide(currentQuantity, 2, BigDecimal.ROUND_HALF_UP)
                    .multiply(quantityToTransfer);

            // Update sender's investedAmount
            senderCoin.setInvestedAmount(totalInvestedAmount.subtract(investedAmountForTransferredQuantity));

            // Update the sender's coin quantity
            senderCoin.setQuantity(senderCoin.getQuantity().subtract(quantityToTransfer));

            // Add to total invested amount transferred for balance update
            totalInvestedAmountTransferred = totalInvestedAmountTransferred.add(investedAmountForTransferredQuantity);

            // If the sender has no more of this coin, remove it from their list
            if (senderCoin.getQuantity().compareTo(BigDecimal.ZERO) == 0) {
                senderCoins.remove(senderCoin);
            }

            // Update the receiver's coin list
            CoinInfo receiverCoin = findCoin(receiverCoins, transferCoin.getName());
            if (receiverCoin == null) {
                // When the receiver does not already have the coin, create a new CoinInfo
                receiverCoins.add(new CoinInfo(transferCoin.getName(), transferCoin.getQuantity(), senderCoin.getAverageBuyPrice(), investedAmountForTransferredQuantity));
            } else {
                // When the receiver already has the coin, update the quantity and investedAmount
                receiverCoin.setQuantity(receiverCoin.getQuantity().add(transferCoin.getQuantity()));
                receiverCoin.setInvestedAmount(receiverCoin.getInvestedAmount().add(investedAmountForTransferredQuantity));
            }
        }

        // Deduct the total invested amount from the sender's balance
        if (totalInvestedAmountTransferred.compareTo(BigDecimal.ZERO) > 0) {
            if (sender.getBalance() < totalInvestedAmountTransferred.longValue()) {
                return new ResponseEntity<>("Sender does not have enough balance for the transfer", HttpStatus.BAD_REQUEST);
            }
            sender.setBalance(sender.getBalance() - totalInvestedAmountTransferred.longValue());
        }

        // Update the receiver's balance
        receiver.setBalance(receiver.getBalance() + totalInvestedAmountTransferred.longValue());

        // Save the updated trader data
        repo.save(sender);
        repo.save(receiver);

        return new ResponseEntity<>("Transfer successful", HttpStatus.OK);
    }


    private CoinInfo findCoin(List<CoinInfo> coins, String coinName) {
        for (CoinInfo coin : coins) {
            if (coin.getName().equals(coinName)) {
                return coin;
            }
        }
        return null;
    }

    public ResponseEntity<?> verify(Trader trader, HttpServletResponse response) {
        Authentication authentication =
                authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(trader.getUsername(), trader.getPassword()));
        if(authentication.isAuthenticated()){
            String jwtToken = jwtService.generateToken(trader.getUsername());
            Cookie jwtCookie = new Cookie("JWT" , jwtToken);
            jwtCookie.setHttpOnly(false);
            jwtCookie.setSecure(false);
            jwtCookie.setPath("/");
            jwtCookie.setMaxAge(60 * 60 * 3);
            response.addCookie(jwtCookie);
            return ResponseEntity.ok(jwtCookie);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Authentication failed");
    }

    public ResponseEntity<String> buyCoin(TradeCoinInfo tradeCoinInfo, Principal principal) {
        // Fetch the trader by username
        Trader trader = repo.findByUsername(principal.getName());

        if (trader == null) {
            return new ResponseEntity<>("Trader not found", HttpStatus.NOT_FOUND);
        }

        // Calculate the total cost of the coins being purchased
        BigDecimal totalCost = tradeCoinInfo.getPrice().multiply(tradeCoinInfo.getQuantity());

        // Check if the trader has enough balance to purchase the coins
        if (trader.getBalance() < totalCost.longValue()) {
            String errorMessage = String.format("Insufficient balance! Current balance: %d, required: %s",
                    trader.getBalance(), totalCost);
            return new ResponseEntity<>(errorMessage, HttpStatus.BAD_REQUEST);
        }

        // Check if the coin is already in the trader's list
        Optional<CoinInfo> existingCoin = trader.getCoins().stream()
                .filter(coin -> coin.getName().equalsIgnoreCase(tradeCoinInfo.getName()))
                .findFirst();

        if (existingCoin.isPresent()) {
            // Coin exists, update the quantity and invested amount
            CoinInfo currentCoin = existingCoin.get();

            // Update quantity
            BigDecimal newQuantity = currentCoin.getQuantity().add(tradeCoinInfo.getQuantity());

            // Update invested amount
            BigDecimal totalInvested = currentCoin.getInvestedAmount().add(totalCost);

            // Update average buy price
            BigDecimal averageBuyPrice = totalInvested.divide(newQuantity, 2, BigDecimal.ROUND_HALF_UP);

            // Set the updated values
            currentCoin.setQuantity(newQuantity);
            currentCoin.setInvestedAmount(totalInvested);
            currentCoin.setAverageBuyPrice(averageBuyPrice); // Set the new average buy price

        } else {
            // Coin doesn't exist, create a new CoinInfo
            CoinInfo newCoin = new CoinInfo(tradeCoinInfo.getName(), tradeCoinInfo.getQuantity(),
                    tradeCoinInfo.getPrice(), totalCost);
            trader.getCoins().add(newCoin);
        }

        // Deduct the total cost from the trader's balance
        trader.setBalance(trader.getBalance() - totalCost.longValue());

        // Save the updated trader
        repo.save(trader);

        return new ResponseEntity<>("Coin purchased successfully! New balance: " + trader.getBalance(), HttpStatus.OK);
    }


    public ResponseEntity<String> sellCoin(TradeCoinInfo sellInfo, Principal principal) {
        // Retrieve the trader
        Trader trader = repo.findByUsername(principal.getName());

        if (trader == null) {
            return new ResponseEntity<>("Trader not found", HttpStatus.NOT_FOUND);
        }

        // Find the coin in the trader's coin list
        CoinInfo traderCoin = trader.getCoins().stream()
                .filter(c -> c.getName().equalsIgnoreCase(sellInfo.getName()))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Coin not found in your portfolio"));

        // Check if the trader has enough quantity to sell
        if (traderCoin.getQuantity().compareTo(sellInfo.getQuantity()) < 0) {
            String errorMessage = String.format("Not enough quantity to sell! Available: %s, Requested: %s",
                    traderCoin.getQuantity(), sellInfo.getQuantity());
            return new ResponseEntity<>(errorMessage, HttpStatus.BAD_REQUEST);
        }

        // Calculate total amount received from the sale
        BigDecimal totalReceivedFromSale = sellInfo.getPrice().multiply(sellInfo.getQuantity());

        // Update the trader's investedAmount based on the selling price
        BigDecimal currentInvestedAmount = traderCoin.getInvestedAmount();
        traderCoin.setInvestedAmount(currentInvestedAmount.subtract(totalReceivedFromSale));

        // Update the quantity of the coin
        traderCoin.setQuantity(traderCoin.getQuantity().subtract(sellInfo.getQuantity()));

        // If all coins are sold, remove it from the trader's list
        if (traderCoin.getQuantity().compareTo(BigDecimal.ZERO) == 0) {
            trader.getCoins().remove(traderCoin);
        }

        // Update the trader's balance with the total received from sale
        trader.setBalance(trader.getBalance() + totalReceivedFromSale.longValue());

        // Save the updated trader information
        repo.save(trader);

        // Return success message
        return new ResponseEntity<>("Coin sold successfully! New balance: " + trader.getBalance(), HttpStatus.OK);
    }

    public ResponseEntity<String> addBalance(Long amountToAdd, Principal principal) {
        // Fetch the trader by username
        Trader trader = repo.findByUsername(principal.getName());

        if (trader == null) {
            return new ResponseEntity<>("Trader not found", HttpStatus.NOT_FOUND);
        }

        // Validate the amount to add
        if (amountToAdd <= 0) {
            return new ResponseEntity<>("Amount to add must be greater than zero", HttpStatus.BAD_REQUEST);
        }

        // Update the trader's balance
        trader.setBalance(trader.getBalance() + amountToAdd);

        // Save the updated trader
        repo.save(trader);

        return new ResponseEntity<>("Balance added successfully! New balance: " + trader.getBalance(), HttpStatus.OK);
    }

    public ResponseEntity<String> withdrawBalance(Long amountToWithdraw, Principal principal) {
        // Fetch the trader by username
        Trader trader = repo.findByUsername(principal.getName());

        if (trader == null) {
            return new ResponseEntity<>("Trader not found", HttpStatus.NOT_FOUND);
        }

        // Validate the amount to withdraw
        if (amountToWithdraw <= 0) {
            return new ResponseEntity<>("Amount to withdraw must be greater than zero", HttpStatus.BAD_REQUEST);
        }

        // Check if the trader has enough balance to withdraw
        if (trader.getBalance() < amountToWithdraw) {
            return new ResponseEntity<>("Insufficient balance for withdrawal", HttpStatus.BAD_REQUEST);
        }

        // Update the trader's balance
        trader.setBalance(trader.getBalance() - amountToWithdraw);

        // Save the updated trader
        repo.save(trader);

        return new ResponseEntity<>("Withdrawal successful! New balance: " + trader.getBalance(), HttpStatus.OK);
    }


}
