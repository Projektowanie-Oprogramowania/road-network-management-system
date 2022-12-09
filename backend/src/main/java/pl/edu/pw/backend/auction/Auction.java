package pl.edu.pw.backend.auction;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.hibernate.annotations.Cascade;
import org.springframework.beans.factory.annotation.Required;
import pl.edu.pw.backend.offer.Offer;

import javax.persistence.*;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import org.hibernate.annotations.CascadeType;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Auction {
    @GeneratedValue
    @Id
    private Long id;

    private String name;
    private String description;
    private Date endDate;
    private String location;

    private State state;

    @OneToMany
    @Cascade(CascadeType.SAVE_UPDATE)
    @JoinColumn(name = "auction_id")
    private List<Offer> offers;

    @ManyToOne
    private Offer winner;

    private BigDecimal maxPrice;

    public Auction(String name, String description, Date endDate, String location, BigDecimal maxPrice) {
        this.name = name;
        this.description = description;
        this.endDate = endDate;
        this.location = location;
        this.maxPrice = maxPrice;

        this.state = State.OPEN;
    }

    public void close() {
        if (offers.isEmpty()) {
            this.state = State.ABANDONED;
            return;
        }

        BigDecimal lowestBid = maxPrice.add(new BigDecimal(1));
        Offer lowestOffer = null;

        for (Offer o : offers) {
            if (o.getPrice().compareTo(maxPrice) <= 0 && o.getPrice().compareTo(lowestBid) < 0) {
                lowestBid = o.getPrice();
                lowestOffer = o;
            }
        }

        if (lowestOffer == null) {
            this.state = State.ABANDONED;
            return;
        }

        this.state = State.CLOSED;
        this.winner = lowestOffer;
    }
}
