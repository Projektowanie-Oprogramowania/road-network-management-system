package pl.edu.pw.backend.point;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PointService {

    @Autowired
    private PointRepository pointRepository;

    Point addPoint(Point point) {
        return pointRepository.save(point);
    }

    Point updatePoint(Point point) {
        return pointRepository.findById(point.getId()).orElseThrow();
    }

    void removePoint(Long id) {
        pointRepository.deleteById(id);
    }

    List<Point> getPointList() {
        return pointRepository.findAll();
    }

    public PointDTO getPoint(Long id) {
        Point point = pointRepository.findById(id).orElseThrow();
        return PointDTO.fromPoint(point);
    }
}
