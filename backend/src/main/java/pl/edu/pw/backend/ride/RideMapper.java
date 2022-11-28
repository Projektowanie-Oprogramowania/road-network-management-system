package pl.edu.pw.backend.ride;

import java.util.List;
import java.util.stream.Collectors;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import pl.edu.pw.backend.segment.Segment;
import pl.edu.pw.backend.segment.SegmentMapper;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
class RideMapper {

    public static RideDTO toRideDTO(Ride ride) {
        return new RideDTO(
            ride.getId(),
            ride.getChargeID(),
            ride.getStartDate(),
            ride.getEndDate(),
            SegmentMapper.map(ride.getSegments()),
            ride.getCarRegistrationNumber()
        );
    }

    public static Ride toRide(AddRideDTO addRideDTO, List<Segment> segments) {
        return new Ride(
            addRideDTO.getChargeID(),
            addRideDTO.getStartDate(),
            addRideDTO.getEndDate(),
            segments,
            addRideDTO.getCarRegistrationNumber()
        );
    }

    public static List<RideDTO> map(List<Ride> rides) {
        return rides
            .stream()
            .map(RideMapper::toRideDTO)
            .collect(Collectors.toList());
    }
}
