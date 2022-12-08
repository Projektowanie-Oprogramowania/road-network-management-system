package pl.edu.pw.backend.offer;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AddOfferDTO {

    private String userName;
    private BigDecimal price;
    private String currency;
    private Long auctionID;

    public String getUserName() {
        return userName;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public String getCurrency() {
        return currency;
    }

    public Long getAuctionID() {
        return auctionID;
    }
}
