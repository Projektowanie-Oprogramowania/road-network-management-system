package pl.edu.pw.backend.auction;
import pl.edu.pw.backend.offer.Offer;

import java.util.ArrayList;
import java.util.List;

public class AuctionMapper {

    public static AuctionDTO map(Auction a) {
        List<Long> offerIds = new ArrayList<>();
        if (a.getOffers() != null)
            for (Offer o : a.getOffers())
                offerIds.add(o.getId());

        return new AuctionDTO(
            a.getId(),
            a.getName(),
            a.getDescription(),
            a.getEndDate(),
            a.getLocation(),
            a.getState(),
            offerIds,
            a.getWinner() == null ? null : a.getWinner().getId(),
            a.getMaxPrice()
        );
    }

    public static Auction map(AddAuctionDTO aDTO) {
        return new Auction(aDTO.getName(), aDTO.getDescription(), aDTO.getEndDate(), aDTO.getLocation(), aDTO.getMaxPrice());
    }
}
