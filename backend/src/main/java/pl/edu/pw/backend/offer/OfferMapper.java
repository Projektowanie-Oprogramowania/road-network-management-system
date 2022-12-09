package pl.edu.pw.backend.offer;

import java.util.List;
import java.util.stream.Collectors;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class OfferMapper {

    public static OfferDTO map(Offer offer){
        return new OfferDTO(
                offer.getId(),
                offer.getUserName(),
                offer.getPrice(),
                offer.getCurrency(),
                offer.getAuction().getId()
        );
    }

    public static Offer map(AddOfferDTO offer) {
        return new Offer(
                offer.getUserName(),
                offer.getPrice(),
                offer.getCurrency(),
                offer.getAuctionID()
        );
    }

    public static List<OfferDTO> map(List<Offer> offers) {
        return offers.stream().map(OfferMapper::map).collect(Collectors.toList());
    }
}
