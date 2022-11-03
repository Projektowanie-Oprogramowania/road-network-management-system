package pl.edu.pw.backend.segment;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import pl.edu.pw.backend.point.Point;

import java.math.BigDecimal;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Segment {
    private int id;
    private List<Point> points;
    private Point startingPoint;
    private Point endingPoint;
    private BigDecimal price;
}
