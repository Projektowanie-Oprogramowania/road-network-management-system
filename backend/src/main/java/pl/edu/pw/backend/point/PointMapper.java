package pl.edu.pw.backend.point;

import java.util.List;
import java.util.stream.Collectors;

public class PointMapper {
    private PointMapper() {}

    public static List<PointDTO> map(List<Point> points) {
        return points
                .stream().map(PointMapper::map)
                .collect(Collectors.toList());
    }

    public static PointDTO map(Point point) {
        return new PointDTO(point.getId(), point.getX(), point.getY(), point.getName());
    }

    public static List<Point> mapDTO(List<PointDTO> points) {
        return points
                .stream().map(PointMapper::map)
                .collect(Collectors.toList());
    }

    public static Point map(PointDTO point) {
        return new Point(point.getX(), point.getY(), point.getName());
    }
}
