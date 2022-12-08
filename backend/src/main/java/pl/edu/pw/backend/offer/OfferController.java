package pl.edu.pw.backend.offer;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.HttpStatus.CREATED;

@RequiredArgsConstructor
@RestController
@RequestMapping("/offer")
public class OfferController {

    private final OfferService offerService;

    @PostMapping
    public ResponseEntity<OfferDTO> addOffer(@RequestBody AddOfferDTO addOfferDTO) {
        return ResponseEntity.status(CREATED).body(offerService.addOffer(OfferMapper.map(addOfferDTO)));
    }

    @GetMapping("/{id}")
    public ResponseEntity<OfferDTO> getOffer(@PathVariable Long id) {
        return ResponseEntity.ok(offerService.getOffer(id));
    }

    @GetMapping("/auction/{id}")
    public ResponseEntity<List<OfferDTO>> getOffersByAuctionID(@PathVariable Long id) {
        return ResponseEntity.ok(offerService.getOffersByAuctionID(id));
    }
}