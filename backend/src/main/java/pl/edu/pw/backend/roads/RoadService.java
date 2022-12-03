package pl.edu.pw.backend.roads;

import java.util.Collection;
import java.util.List;
import javax.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.edu.pw.backend.point.PointMapper;
import pl.edu.pw.backend.region.Region;
import pl.edu.pw.backend.region.RegionMapper;
import pl.edu.pw.backend.region.RegionRepository;
import pl.edu.pw.backend.segment.Segment;
import pl.edu.pw.backend.segment.SegmentRepository;

@Service
@RequiredArgsConstructor
public class RoadService {
    private final RoadRepository roadRepository;
    private final RegionRepository regionRepository;
    private final SegmentRepository segmentRepository;

    @Transactional
    RoadDTO addRoad(AddRoad addRoad) {
        Road road = RoadMapper.map(addRoad, (List<Segment>) segmentRepository.findAllById(addRoad.segments));
        Region region = regionRepository.saveAndFlush(regionRepository.findById(addRoad.getRegion().getId()).orElseThrow());
        road.setRegion(region);
        return RoadMapper.map(roadRepository.save(road));
    }

    @Transactional
    public RoadDTO updateRoad(AddRoad roadDTO, int id) {
        Road road = roadRepository.findById(id).orElseThrow();
        road.setName(roadDTO.name);
        road.setEndingPoint(PointMapper.map(roadDTO.endingPoint));
        road.setLength(roadDTO.length);
        Region region = regionRepository.saveAndFlush(regionRepository.findById(roadDTO.getRegion().getId()).orElseThrow());
        road.setRegion(region);
        road.getSegments().clear();
        road.getSegments().addAll((Collection<Segment>) segmentRepository.findAllById(roadDTO.segments));
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

    List<RoadDTO> getRoads() {
        return RoadMapper.map((List<Road>) roadRepository.findAll());
    }

}
