package pl.edu.pw.backend.offer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
class OfferService {

    @Autowired
    private OfferRepository offerRepository;

    OfferDTO addOffer(Offer offer) {
        return OfferMapper.map(offerRepository.save(offer));
    }

    OfferDTO getOffer(Long id) {
        return OfferMapper.map(offerRepository.findById(id).orElseThrow());
    }

    List<OfferDTO> getOffersByAuctionID(Long id) {
        return OfferMapper.map(offerRepository.getAllByAuctionID(id));
    }
}