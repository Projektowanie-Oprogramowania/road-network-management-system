package pl.edu.pw.backend.ride;

import java.util.Collection;
import java.util.List;
import javax.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.edu.pw.backend.segment.Segment;
import pl.edu.pw.backend.segment.SegmentRepository;

@Service
@RequiredArgsConstructor
class RideService {

    private final RideRepository rideRepository;
    private final SegmentRepository segmentRepository;

    @Transactional
    RideDTO saveRide(AddRideDTO addRide) {
        Ride ride = RideMapper.toRide(addRide,
            (List<Segment>) segmentRepository.findAllById(addRide.segments));
        return RideMapper.toRideDTO(rideRepository.save(ride));
    }

    @Transactional
    RideDTO updateRide(AddRideDTO addRide, int id) {
        Ride ride = rideRepository.findById(id).orElseThrow();
        ride.setChargeID(addRide.chargeID);
        ride.setStartDate(addRide.startDate);
        ride.setEndDate(addRide.endDate);
        ride.setCarRegistrationNumber(addRide.carRegistrationNumber);
        ride.getSegments().clear();
        ride.getSegments().addAll((Collection<Segment>) segmentRepository.findAllById(addRide.segments));
        return RideMapper.toRideDTO(rideRepository.save(ride));
    }

    void deleteRide(int id) {
        rideRepository.deleteById(id);
    }

    RideDTO getRide(int id) {
        Ride ride = rideRepository.findById(id).orElseThrow();
        return RideMapper.toRideDTO(ride);
    }

    List<RideDTO> getRides() {
        return RideMapper.map(rideRepository.findAll());
    }
}
