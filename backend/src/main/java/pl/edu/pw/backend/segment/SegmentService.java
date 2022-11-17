package pl.edu.pw.backend.segment;

import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.edu.pw.backend.point.Point;
import pl.edu.pw.backend.point.PointService;

@Service
class SegmentService {

    @Autowired
    private SegmentRepository segmentRepository;

    @Autowired
    private PointService pointService;

    Segment addSegment(AddSegmentDTO addSegmentDTO) {
        List<Point> points = addSegmentDTO.getPointsIds().stream()
            .map(pointId -> pointService.getPoint(pointId).toFullPoint())
            .collect(Collectors.toList());
        Point startingPoint = pointService.getPoint(addSegmentDTO.getStartingPointId())
            .toFullPoint();
        Point endingPoint = pointService.getPoint(addSegmentDTO.getEndingPointId()).toFullPoint();
        Segment segment = new Segment(points, startingPoint, endingPoint, addSegmentDTO.getPrice());
        return segmentRepository.save(segment);
    }

    Segment updateSegment(AddSegmentDTO addSegmentDTO, int id) {
        Segment seg = segmentRepository.findById(id).orElseThrow();
        seg.setPoints(addSegmentDTO.getPointsIds().stream()
            .map(pointId -> pointService.getPoint(pointId).toFullPoint())
            .collect(Collectors.toList()));
        seg.setStartingPoint(
            pointService.getPoint(addSegmentDTO.getStartingPointId()).toFullPoint());
        seg.setEndingPoint(pointService.getPoint(addSegmentDTO.getEndingPointId()).toFullPoint());
        seg.setPrice(addSegmentDTO.getPrice());
        return segmentRepository.save(seg);
    }

    void removeSegment(int id) {
        segmentRepository.deleteById(id);
    }

    List<Segment> getSegments() {
        return (List<Segment>) segmentRepository.findAll();
    }

    Segment getSegment(int id) {
        return segmentRepository.findById(id).orElseThrow();
    }

}
