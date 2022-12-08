package pl.edu.pw.backend.offer;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Offer {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String userName;

    private BigDecimal price;

    private String currency;

    private Long auctionID;

    public Offer(String userName, BigDecimal price, String currency, Long auctionID) {

        this.userName = userName;
        this.price = CurrencyMapper.map(Currency.valueOf(currency), price);
        this.currency = Currency.PLN.getName();
        this.auctionID = auctionID;

    }
}
