package pl.edu.pw.backend.segment;

import pl.edu.pw.backend.point.Point;
import pl.edu.pw.backend.point.PointDTO;
import pl.edu.pw.backend.point.PointMapper;

import java.util.List;
import java.util.stream.Collectors;

public class SegmentMapper {
    private SegmentMapper() {}

    public static List<SegmentDTO> map(List<Segment> segments) {
        return segments
                .stream().map(SegmentMapper::map)
                .collect(Collectors.toList());
    }

    public static List<Segment> mapDTO(List<SegmentDTO> segments) {
        return segments
                .stream().map(SegmentMapper::map)
                .collect(Collectors.toList());
    }

    public static Segment map(SegmentDTO segment) {
        List<Point> points = PointMapper.mapDTO(segment.getPoints());
        Point startingPointDTO = PointMapper.map(segment.getStartingPoint());
        Point endingPointDTO = PointMapper.map(segment.getEndingPoint());
        return new Segment(segment.getId(), points, startingPointDTO, endingPointDTO, segment.getPrice());
    }

    public static SegmentDTO map(Segment segment) {
        List<PointDTO> points = PointMapper.map(segment.getPoints());
        PointDTO startingPointDTO = PointMapper.map(segment.getStartingPoint());
        PointDTO endingPointDTO = PointMapper.map(segment.getEndingPoint());
        return new SegmentDTO(segment.getId(), points, startingPointDTO, endingPointDTO, segment.getPrice());
    }

}
