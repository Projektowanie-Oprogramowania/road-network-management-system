package pl.edu.pw.backend.auction;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuctionDTO {
    Long id;
    String name;
    String description;
    Date endDate;
    String location;
    State state;

    List<Long> offerIds;

    Long winnerId;
    BigDecimal maxPrice;
}
