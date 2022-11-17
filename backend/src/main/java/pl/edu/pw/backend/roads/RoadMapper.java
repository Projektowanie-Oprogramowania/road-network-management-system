package pl.edu.pw.backend.roads;

import pl.edu.pw.backend.point.PointDTO;
import pl.edu.pw.backend.point.PointMapper;
import pl.edu.pw.backend.region.RegionDTO;
import pl.edu.pw.backend.region.RegionMapper;
import pl.edu.pw.backend.segment.Segment;
import pl.edu.pw.backend.segment.SegmentDTO;
import pl.edu.pw.backend.segment.SegmentMapper;

import java.util.List;
import java.util.stream.Collectors;

class RoadMapper {
    private RoadMapper() {}

    public static Road map(AddRoad addRoad, List<Segment> segments) {
        return new Road(
                segments,
                addRoad.name,
                PointMapper.map(addRoad.startingPoint),
                PointMapper.map(addRoad.endingPoint),
                addRoad.length,
                RegionMapper.map(addRoad.region)
        );
    }

    public static RoadDTO map(Road road) {
        List<SegmentDTO> segments = SegmentMapper.map(road.getSegments());
        PointDTO startingPointDTO = PointMapper.map(road.getStartingPoint());
        PointDTO endingPointDTO = PointMapper.map(road.getEndingPoint());
        RegionDTO regionDTO = RegionMapper.map(road.getRegion());
        return new RoadDTO(road.getId(), segments, road.getName(), startingPointDTO, endingPointDTO, road.getLength(), regionDTO);
    }

    public static List<RoadDTO> map(List<Road> roads) {
        return roads
                .stream()
                .map(RoadMapper::map)
                .collect(Collectors.toList());
    }
}
