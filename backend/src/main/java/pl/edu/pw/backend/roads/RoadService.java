package pl.edu.pw.backend.roads;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.edu.pw.backend.region.Region;
import pl.edu.pw.backend.region.RegionRepository;

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
    public RoadDTO updateRoads(RoadDTO roadDTO) {
        Road road = roadRepository.findById(roadDTO.getId()).orElseThrow();
        //TODO
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
