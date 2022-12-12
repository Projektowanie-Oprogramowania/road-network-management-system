package pl.edu.pw.backend.auction;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.edu.pw.backend.segment.*;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@RestController
@RequestMapping("/auction")
public class AuctionController {

    private final AuctionService auctionService;

    @GetMapping
    public ResponseEntity<List<AuctionDTO>> getAuctions() {
        List<AuctionDTO> auctionList = auctionService.getAuctions().stream()
                .map(AuctionMapper::map).collect(Collectors.toList());
        return ResponseEntity.ok(auctionList);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AuctionDTO> getAuction(@PathVariable Long id) {
        return ResponseEntity.ok(AuctionMapper.map(auctionService.getAuction(id)));
    }

    @PostMapping
    public ResponseEntity<AuctionDTO> addAuction(@RequestBody AddAuctionDTO addAuctionDTO) {
        Auction auction = auctionService.addSegment(addAuctionDTO);
        return ResponseEntity.ok(AuctionMapper.map(auction));
    }

    @PutMapping("/{id}")
    public ResponseEntity<AuctionDTO> updateAuction(@PathVariable Long id,
                                                    @RequestBody AddAuctionDTO addAuctionDTO) {
        Auction auction = auctionService.updateAuction(addAuctionDTO, id);
        return ResponseEntity.ok(AuctionMapper.map(auction));
    }

    @PutMapping("close/{id}")
    public ResponseEntity<AuctionDTO> closeAuction(@PathVariable Long id) {
        Auction auction = auctionService.closeAuction(id);
        return ResponseEntity.ok(AuctionMapper.map(auction));
    }

}
