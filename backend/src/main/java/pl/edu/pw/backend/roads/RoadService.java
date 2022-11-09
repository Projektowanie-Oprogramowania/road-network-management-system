package pl.edu.pw.backend.roads;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.edu.pw.backend.point.PointMapper;
import pl.edu.pw.backend.region.Region;
import pl.edu.pw.backend.region.RegionMapper;
import pl.edu.pw.backend.region.RegionRepository;
import pl.edu.pw.backend.segment.SegmentMapper;

import javax.transaction.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RoadService {
    private final RoadRepository roadRepository;
    private final RegionRepository regionRepository;

    @Transactional
    RoadDTO addRoad(AddRoad addRoad) {
        Road road = RoadMapper.map(addRoad);
        return RoadMapper.map(roadRepository.save(road));
    }

    @Transactional
    public RoadDTO updateRoad(AddRoad roadDTO, int id) {
        Road road = roadRepository.findById(id).orElseThrow();
        road.setName(roadDTO.name);
        road.setEndingPoint(PointMapper.map(roadDTO.endingPoint));
        road.setLength(roadDTO.length);
        road.setRegion(RegionMapper.map(roadDTO.region));
        road.setSegments(SegmentMapper.mapDTO(roadDTO.segments));
        road.setStartingPoint(PointMapper.map(roadDTO.startingPoint));
        return RoadMapper.map(roadRepository.save(road));
    }

    void removeRoad(int id) {
        roadRepository.deleteById(id);
    }

    RoadDTO getRoad(int id) {
        Road road = roadRepository.findById(id).orElseThrow();
        return RoadMapper.map(road);
    }

    List<RoadDTO> getRoadsByRegion(int id) {
        Region region = regionRepository.findById(id).orElseThrow();
        return RoadMapper.map(roadRepository.findByRegion(region));
    }

}
