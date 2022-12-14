package pl.edu.pw.backend.point;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AddPointDTO {
    double x;
    double y;

    String name;

    public Point toPoint() {
        return new Point(x, y, name);
    }

    public static PointDTO fromPoint(Point point) {
        return new PointDTO(point.getId(), point.getX(), point.getY(), point.getName());
    }
}
