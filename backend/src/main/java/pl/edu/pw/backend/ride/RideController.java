package pl.edu.pw.backend.ride;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("ride")
class RideController {

    private final RideService rideService;

    @GetMapping("/{id}")
    ResponseEntity<RideDTO> getRide(@PathVariable int id) {
        return ResponseEntity.status(HttpStatus.OK).body(rideService.getRide(id));
    }

    @GetMapping
    ResponseEntity<List<RideDTO>> getRides() {
        return ResponseEntity.status(HttpStatus.OK).body(rideService.getRides());
    }

    @PostMapping
    ResponseEntity<RideDTO> saveRide(@RequestBody AddRideDTO addRide) {
        return ResponseEntity.status(HttpStatus.CREATED).body(rideService.saveRide(addRide));
    }

    @PutMapping("/{id}")
    ResponseEntity<RideDTO> updateRide(@RequestBody AddRideDTO rideDTO, @PathVariable int id) {
        return ResponseEntity.status(HttpStatus.OK).body(rideService.updateRide(rideDTO, id));
    }

    @DeleteMapping("/{id}")
    ResponseEntity<Void> deleteRide(@PathVariable int id) {
        rideService.deleteRide(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

}
