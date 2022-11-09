package pl.edu.pw.backend.segment;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Value;
import pl.edu.pw.backend.point.PointDTO;

import java.math.BigDecimal;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SegmentDTO {
    int id;
    List<PointDTO> points;
    PointDTO startingPoint;
    PointDTO endingPoint;
    BigDecimal price;
}
