package pl.edu.pw.backend.offer;

import java.util.List;
import java.util.stream.Collectors;

public class OfferMapper {

    public static OfferDTO map(Offer offer){
        return new OfferDTO(
                offer.getId(),
                offer.getUserName(),
                offer.getPrice(), //TODO recalculate to CURRENCY
                offer.getCurrency(),
                offer.getAuctionID()
        );
    }

    public static Offer map(AddOfferDTO offer) {
        return new Offer(
                offer.getUserName(),
                offer.getPrice(), //TODO recalculate to pln
                offer.getCurrency(),
                offer.getAuctionID()
        );
    }

    public static List<OfferDTO> map(List<Offer> offers) {
        return offers.stream().map(OfferMapper::map).collect(Collectors.toList());
    }
}
