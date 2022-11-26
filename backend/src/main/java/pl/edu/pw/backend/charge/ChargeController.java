package pl.edu.pw.backend.charge;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping
public class ChargeController {
    private final ChargeService chargeService;

    @PostMapping
    ResponseEntity<ChargeDTO> addCharge(@RequestBody AddChargeDTO addCharge) {
        return ResponseEntity.status(HttpStatus.CREATED).body(chargeService.addCharge(addCharge));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ChargeDTO> updateCharge(@RequestBody AddChargeDTO chargeDTO, @PathVariable int id) {
        return ResponseEntity.status(HttpStatus.OK).body(chargeService.updateCharge(chargeDTO, id));
    }

    @DeleteMapping("/{id}")
    void removeCharge(@PathVariable int id) {
        chargeService.removeCharge(id);
    }

    @GetMapping("/{id}")
    ChargeDTO getCharge(@PathVariable int id) {
        return chargeService.getCharge(id);
    }

    @GetMapping("/user/{id}")
    List<ChargeDTO> getChargesByUserID(@PathVariable int id) {
        return chargeService.getChargesByUserID(id);
    }
}
