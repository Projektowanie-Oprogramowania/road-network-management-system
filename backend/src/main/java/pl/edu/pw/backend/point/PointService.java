package pl.edu.pw.backend.point;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.edu.pw.backend.tariff.Tariff;

@Service
public class PointService {

    @Autowired
    private PointRepository pointRepository;

    Point addPoint(Point point) {
        return pointRepository.save(point);
    }

    Point updatePoint(Point point) {
        Point _point = pointRepository.findById(point.getId()).orElseThrow();
        _point.setName(point.getName());
        _point.setX(point.getX());
        _point.setY(point.getY());
        return pointRepository.save(_point);
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
