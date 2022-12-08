package pl.edu.pw.backend.offer;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import pl.edu.pw.backend.infrastructure.Infrastructure;
import pl.edu.pw.backend.point.PointMapper;

import java.math.BigDecimal;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class OfferDTO {

    private Long id;
    private String userName;
    private BigDecimal price;
    private String currency;
    private Long auctionID;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
