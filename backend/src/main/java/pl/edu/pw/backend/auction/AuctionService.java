package pl.edu.pw.backend.auction;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
class AuctionService {

    @Autowired
    private AuctionRepository auctionRepository;

    List<Auction> getAuctions() {
        return auctionRepository.findAll();
    }

    Auction getAuction(Long id) {
        return auctionRepository.findById(id).orElseThrow();
    }


    Auction addSegment(AddAuctionDTO addAuctionDTO) {
        Auction auction = AuctionMapper.map(addAuctionDTO);
        return auctionRepository.save(auction);
    }


    Auction updateAuction(AddAuctionDTO addAuctionDTO, Long id) {
        Auction auction = auctionRepository.findById(id).orElseThrow();
        auction.setName(addAuctionDTO.name);
        auction.setDescription(addAuctionDTO.description);
        auction.setEndDate(addAuctionDTO.endDate);
        auction.setLocation(addAuctionDTO.location);
        auction.setMaxPrice(addAuctionDTO.maxPrice);
        return auctionRepository.save(auction);
    }


    Auction closeAuction(Long id) {
        Auction auction = auctionRepository.findById(id).orElseThrow();
        auction.setState(State.CLOSED);
        auction.close();
        return auctionRepository.save(auction);
    }

}
