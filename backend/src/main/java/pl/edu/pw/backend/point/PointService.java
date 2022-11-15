package pl.edu.pw.backend.point;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PointService {
    private final static Long RANDOM_ID = 1234L;

    @Autowired
    private PointRepository pointRepository;

    Point addPoint(Point point) {
        return pointRepository.save(point);
    }

    Point updatePoint(Point point) {
        return pointRepository.findById(RANDOM_ID).orElseThrow();
    }

    void removePoint(Long id) {
        pointRepository.deleteById(id);
    }

    List<Point> getPointList() {
        return pointRepository.findAll();
    }

    PointDTO getPoint(Long id) {
        Point point = pointRepository.findById(id).orElseThrow();
        return PointDTO.fromPoint(point);
    }
}
