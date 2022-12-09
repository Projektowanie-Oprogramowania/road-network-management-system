package pl.edu.pw.backend.offer;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Cascade;
import pl.edu.pw.backend.auction.Auction;

import javax.persistence.*;
import java.math.BigDecimal;
import org.hibernate.annotations.CascadeType;

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

    @ManyToOne
    @Cascade(CascadeType.SAVE_UPDATE)
    @JoinColumn(name = "auction_id")
    private Auction auction;

    public Offer(String userName, BigDecimal price, String currency) {
        this.userName = userName;
        this.price = CurrencyMapper.map(Currency.valueOf(currency), price);
        this.currency = Currency.PLN.getName();
    }
}
