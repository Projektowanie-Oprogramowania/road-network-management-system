package pl.edu.pw.backend.offer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.edu.pw.backend.auction.Auction;
import pl.edu.pw.backend.auction.AuctionRepository;

import java.util.List;

@Service
class OfferService {

    @Autowired
    private OfferRepository offerRepository;

    @Autowired
    private AuctionRepository auctionRepository;

    OfferDTO addOffer(Offer offer) {
        return OfferMapper.map(offerRepository.save(offer));
    }

    OfferDTO getOffer(Long id) {
        return OfferMapper.map(offerRepository.findById(id).orElseThrow());
    }

    List<OfferDTO> getOffersByAuctionID(Long id) {
        Auction auction = auctionRepository.findById(id).orElseThrow();
        return OfferMapper.map(offerRepository.getAllByAuction(auction));
    }
}