package pl.edu.pw.backend.segment;

import lombok.Value;
import pl.edu.pw.backend.point.PointDTO;

import java.math.BigDecimal;
import java.util.List;

@Value
public class SegmentDTO {
    int id;
    List<PointDTO> points;
    PointDTO startingPoint;
    PointDTO endingPoint;
    BigDecimal price;
}
