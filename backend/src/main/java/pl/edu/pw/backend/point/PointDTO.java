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

    public Point toPoint() {
        return new Point(x, y);
    }

    public Point toFullPoint() {
        return new Point(id, x, y);
    }

    public static PointDTO fromPoint(Point point) {
        return new PointDTO(point.getId(), point.getX(), point.getY());
    }
}
