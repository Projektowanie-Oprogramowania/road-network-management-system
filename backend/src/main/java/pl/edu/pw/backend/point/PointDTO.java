package pl.edu.pw.backend.point;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import pl.edu.pw.backend.infrastructure.Infrastructure;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PointDTO {
    private Long id;
    double x;
    double y;

    String name;

    public Point toPoint() {
        return new Point(x, y, name);
    }

    public Point toFullPoint() {
        return new Point(id, x, y, name);
    }

    public static PointDTO fromPoint(Point point) {
        return new PointDTO(point.getId(), point.getX(), point.getY(), point.getName());
    }
}
